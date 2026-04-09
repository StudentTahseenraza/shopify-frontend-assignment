// Custom Shopify JavaScript
(function() {
    'use strict';
    
    let currentProduct = null;
    let currentVariant = null;
    let selectedSize = null;
    let selectedColor = null;
    
    const popup = document.getElementById('product-popup');
    const closeBtn = document.querySelector('.popup-close');
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const quantityInput = document.getElementById('quantity-input');
    
    function showMessage(message, isError = false) {
        const messageDiv = document.getElementById('cart-message');
        if (messageDiv) {
            messageDiv.textContent = message;
            messageDiv.className = `cart-message ${isError ? 'error' : 'success'}`;
            setTimeout(() => {
                messageDiv.textContent = '';
                messageDiv.className = 'cart-message';
            }, 3000);
        }
    }
    
    async function fetchProduct(handle) {
        try {
            const response = await fetch(`/products/${handle}.js`);
            if (!response.ok) throw new Error('Product not found');
            return await response.json();
        } catch (error) {
            console.error('Error fetching product:', error);
            return null;
        }
    }
    
    function getVariantByOptions(product, size, color) {
        if (!product || !product.variants) return null;
        
        return product.variants.find(variant => {
            const options = variant.options;
            const sizeMatch = !size || options.includes(size);
            const colorMatch = !color || options.includes(color);
            return sizeMatch && colorMatch;
        });
    }
    
    function updateVariantOptions(product) {
        const sizes = new Set();
        const colors = new Set();
        
        product.variants.forEach(variant => {
            variant.options.forEach(option => {
                if (['XS', 'S', 'M', 'L', 'XL', 'XXL'].includes(option)) {
                    sizes.add(option);
                } else if (['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Pink'].includes(option)) {
                    colors.add(option);
                }
            });
        });
        
        const sizeContainer = document.getElementById('size-options');
        if (sizeContainer) {
            sizeContainer.innerHTML = '';
            Array.from(sizes).forEach(size => {
                const option = document.createElement('div');
                option.className = `variant-option ${selectedSize === size ? 'selected' : ''}`;
                option.textContent = size;
                option.addEventListener('click', () => {
                    document.querySelectorAll('#size-options .variant-option').forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    option.classList.add('selected');
                    selectedSize = size;
                    updateSelectedVariant(product);
                });
                sizeContainer.appendChild(option);
            });
        }
        
        const colorContainer = document.getElementById('color-options');
        if (colorContainer) {
            colorContainer.innerHTML = '';
            Array.from(colors).forEach(color => {
                const option = document.createElement('div');
                option.className = `variant-option ${selectedColor === color ? 'selected' : ''}`;
                option.textContent = color;
                option.addEventListener('click', () => {
                    document.querySelectorAll('#color-options .variant-option').forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    option.classList.add('selected');
                    selectedColor = color;
                    updateSelectedVariant(product);
                });
                colorContainer.appendChild(option);
            });
        }
    }
    
    function updateSelectedVariant(product) {
        if (selectedSize && selectedColor) {
            currentVariant = getVariantByOptions(product, selectedSize, selectedColor);
            if (currentVariant) {
                const priceElement = document.getElementById('popup-product-price');
                if (priceElement) {
                    priceElement.textContent = formatMoney(currentVariant.price);
                }
            }
        }
    }
    
    function formatMoney(cents) {
        return '$' + (cents / 100).toFixed(2);
    }
    
    async function openProductPopup(productHandle) {
        const product = await fetchProduct(productHandle);
        if (!product) return;
        
        currentProduct = product;
        selectedSize = null;
        selectedColor = null;
        
        document.getElementById('popup-product-title').textContent = product.title;
        document.getElementById('popup-product-price').textContent = formatMoney(product.price);
        
        if (product.compare_at_price && product.compare_at_price > product.price) {
            const regularPriceEl = document.getElementById('popup-regular-price');
            if (regularPriceEl) {
                regularPriceEl.textContent = formatMoney(product.compare_at_price);
                regularPriceEl.style.display = 'inline';
            }
        } else {
            const regularPriceEl = document.getElementById('popup-regular-price');
            if (regularPriceEl) regularPriceEl.style.display = 'none';
        }
        
        const plainDescription = product.body_html ? product.body_html.replace(/<[^>]*>/g, '').substring(0, 200) : 'No description available';
        document.getElementById('popup-product-description').textContent = plainDescription;
        
        const imageElement = document.getElementById('popup-product-image');
        if (product.images && product.images.length > 0) {
            imageElement.src = product.images[0];
            imageElement.alt = product.title;
        }
        
        updateVariantOptions(product);
        
        if (popup) {
            popup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closePopup() {
        if (popup) {
            popup.style.display = 'none';
            document.body.style.overflow = '';
        }
        currentProduct = null;
        currentVariant = null;
        selectedSize = null;
        selectedColor = null;
    }
    
    async function addToCart(variantId, quantity) {
        try {
            const response = await fetch('/cart/add.js', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: variantId, quantity: quantity })
            });
            
            if (!response.ok) throw new Error('Failed to add to cart');
            
            const data = await response.json();
            showMessage('✓ Added to cart!');
            return data;
        } catch (error) {
            console.error('Error:', error);
            showMessage('Failed to add to cart', true);
            return null;
        }
    }
    
    async function handleSpecialBundle() {
        if (selectedColor === 'Black' && selectedSize === 'M') {
            showMessage('🎁 Bonus: Soft Winter Jacket added!');
            
            try {
                const response = await fetch('/products/soft-winter-jacket.js');
                if (response.ok) {
                    const jacketProduct = await response.json();
                    if (jacketProduct.variants && jacketProduct.variants.length > 0) {
                        await addToCart(jacketProduct.variants[0].id, 1);
                    }
                }
            } catch (error) {
                console.error('Bundle error:', error);
            }
        }
    }
    
    async function handleAddToCart() {
        if (!currentProduct) {
            showMessage('No product selected', true);
            return;
        }
        
        const quantity = parseInt(quantityInput?.value) || 1;
        const variantToAdd = currentVariant || currentProduct.variants[0];
        
        if (!variantToAdd) {
            showMessage('Please select size and color', true);
            return;
        }
        
        const result = await addToCart(variantToAdd.id, quantity);
        
        if (result) {
            await handleSpecialBundle();
            setTimeout(() => closePopup(), 1500);
        }
    }
    
    function setupQuantityControls() {
        const decreaseBtn = document.querySelector('[data-action="decrease"]');
        const increaseBtn = document.querySelector('[data-action="increase"]');
        
        if (decreaseBtn && quantityInput) {
            decreaseBtn.addEventListener('click', () => {
                let val = parseInt(quantityInput.value);
                if (val > 1) quantityInput.value = val - 1;
            });
        }
        
        if (increaseBtn && quantityInput) {
            increaseBtn.addEventListener('click', () => {
                let val = parseInt(quantityInput.value);
                quantityInput.value = val + 1;
            });
        }
    }
    
    function initProductCards() {
        // Use mutation observer to handle dynamically loaded products
        const observeProducts = () => {
            const productCards = document.querySelectorAll('.product-card');
            productCards.forEach(card => {
                if (!card.hasAttribute('data-listener')) {
                    card.setAttribute('data-listener', 'true');
                    card.addEventListener('click', (e) => {
                        const productHandle = card.dataset.productHandle;
                        if (productHandle) openProductPopup(productHandle);
                    });
                }
            });
        };
        
        // Initial load
        observeProducts();
        
        // Watch for dynamically added products
        const observer = new MutationObserver(observeProducts);
        observer.observe(document.getElementById('productGrid') || document.body, {
            childList: true,
            subtree: true
        });
    }
    
    function initPopupEvents() {
        if (closeBtn) closeBtn.addEventListener('click', closePopup);
        if (popup) {
            popup.addEventListener('click', (e) => {
                if (e.target === popup) closePopup();
            });
        }
        if (addToCartBtn) addToCartBtn.addEventListener('click', handleAddToCart);
    }
    
    document.addEventListener('DOMContentLoaded', () => {
        initProductCards();
        initPopupEvents();
        setupQuantityControls();
    });
    
    window.shopifyCustom = { openProductPopup, closePopup, addToCart };
})();