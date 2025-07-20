// Component loader utility
class ComponentLoader {
    constructor() {
        this.components = {};
    }

    // Load a component from file
    async loadComponent(name, selector) {
        try {
            const response = await fetch(`components/${name}.html`);
            const html = await response.text();
            
            // Insert the component into the specified selector
            const element = document.querySelector(selector);
            if (element) {
                element.innerHTML = html;
                this.components[name] = html;
            }
        } catch (error) {
            console.error(`Failed to load component ${name}:`, error);
        }
    }

    // Load styles component
    async loadStyles() {
        try {
            const response = await fetch('components/styles.html');
            const styles = await response.text();
            
            // Insert styles into head
            const styleElement = document.createElement('style');
            styleElement.textContent = styles;
            document.head.appendChild(styleElement);
        } catch (error) {
            console.error('Failed to load styles:', error);
        }
    }

    // Initialize all components
    async init() {
        // Load styles first
        await this.loadStyles();
        
        // Load header and footer
        await this.loadComponent('header', '#header-placeholder');
        await this.loadComponent('footer', '#footer-placeholder');
        
        // Initialize any component-specific functionality
        this.initNavigation();
    }

    // Initialize navigation functionality
    initNavigation() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const loader = new ComponentLoader();
    loader.init();
}); 