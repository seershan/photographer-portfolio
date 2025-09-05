       document.addEventListener('DOMContentLoaded', function() {
            // --- Icon Initialization ---
            lucide.createIcons();

            // --- Mobile Menu Toggle ---
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
            document.querySelectorAll('#mobile-menu a').forEach(link => {
                link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
            });

            // --- Header Scroll Effect ---
            const header = document.getElementById('header');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('bg-black', 'bg-opacity-90', 'backdrop-blur-sm', 'shadow-lg');
                } else {
                    header.classList.remove('bg-black', 'bg-opacity-90', 'backdrop-blur-sm', 'shadow-lg');
                }
            });

            // --- Active Nav Link on Scroll ---
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('header .nav-link');
            const onScroll = () => {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    if (pageYOffset >= sectionTop - 60) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').includes(current)) {
                        link.classList.add('active');
                    }
                });
            };
            window.addEventListener('scroll', onScroll);


            // --- Gallery Filtering ---
            const filterButtons = document.getElementById('filter-buttons');
            const galleryItems = document.querySelectorAll('#gallery .gallery-item');
            
            filterButtons.addEventListener('click', (e) => {
                if (e.target.tagName !== 'BUTTON') return;
                
                // Update active button
                filterButtons.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');

                const filter = e.target.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.classList.remove('hide');
                    } else {
                        item.classList.add('hide');
                    }
                });
            });


            // --- Lightbox Functionality ---
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            const gallery = document.getElementById('gallery');
            let currentImageIndex = 0;
            let images = [];

            const updateImages = () => {
                 images = Array.from(gallery.querySelectorAll('.gallery-item:not(.hide) img'));
            }

            const showImage = (index) => {
                if(index < 0 || index >= images.length) return;
                lightboxImg.src = images[index].src;
                currentImageIndex = index;
            }

            gallery.addEventListener('click', e => {
                const img = e.target.closest('img');
                if (img) {
                    updateImages();
                    const item = img.parentElement;
                    const itemIndex = images.findIndex(i => i.src === img.src);
                    if (itemIndex > -1) {
                         showImage(itemIndex);
                         lightbox.classList.add('show');
                         document.body.style.overflow = 'hidden';
                    }
                }
            });

            const closeLightbox = () => {
                lightbox.classList.remove('show');
                document.body.style.overflow = 'auto';
            };

            document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
            document.getElementById('lightbox-prev').addEventListener('click', () => showImage(currentImageIndex - 1));
            document.getElementById('lightbox-next').addEventListener('click', () => showImage(currentImageIndex + 1));
            lightbox.addEventListener('click', e => {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });

            // Keyboard navigation for lightbox
            document.addEventListener('keydown', e => {
                if (lightbox.classList.contains('show')) {
                    if (e.key === 'Escape') closeLightbox();
                    if (e.key === 'ArrowLeft') showImage(currentImageIndex - 1);
                    if (e.key === 'ArrowRight') showImage(currentImageIndex + 1);
                }
            });
            

            // --- Fade-in Animations on Scroll ---
            const faders = document.querySelectorAll('.fade-in');
            const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -100px 0px" };
            
            const appearOnScroll = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                });
            }, appearOptions);

            faders.forEach(fader => appearOnScroll.observe(fader));

            // --- Contact Form Submission ---
            const contactForm = document.getElementById('contact-form');
            const submitButton = document.getElementById('submit-button');
            const originalButtonText = submitButton.innerHTML;

            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();

                // Change button to show success message
                submitButton.innerHTML = `
                    <span class="flex items-center justify-center">
                        <i data-lucide="check-circle" class="h-5 w-5 mr-2"></i>
                        Message Sent!
                    </span>`;
                submitButton.disabled = true;
                submitButton.classList.remove('hover:bg-yellow-500', 'bg-yellow-600');
                submitButton.classList.add('bg-green-600', 'cursor-not-allowed');
                
                // Re-render the new icon
                lucide.createIcons();
                
                contactForm.reset();

                // Revert button back after a few seconds
                setTimeout(() => {
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                    submitButton.classList.add('hover:bg-yellow-500', 'bg-yellow-600');
                    submitButton.classList.remove('bg-green-600', 'cursor-not-allowed');
                }, 4000);
            });
        });