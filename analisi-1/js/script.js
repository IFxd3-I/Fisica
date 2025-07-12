// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.box');

    // Staggered fade-in for topic boxes
    boxes.forEach((box, index) => {
        // Delay each box's animation
        setTimeout(() => {
            box.style.opacity = '1';
            box.style.transform = 'translateY(0) scale(1)';
        }, 100 + (index * 150)); // 100ms initial delay, then 150ms delay for each subsequent box
    });

    // You could add tooltips here if desired
    // Example for one box (would need to be generalized)
    // const campoRBox = document.querySelector('a[href="pages/il-campo-reale.html"]');
    // campoRBox.addEventListener('mouseover', () => {
    //     // Create and show a tooltip
    //     const tooltip = document.createElement('div');
    //     tooltip.className = 'tooltip';
    //     tooltip.textContent = 'The set of real numbers with its algebraic and order structure.';
    //     campoRBox.appendChild(tooltip);
    //     // Position tooltip
    //     // Add CSS for .tooltip
    // });
    // campoRBox.addEventListener('mouseout', () => {
    //     // Remove tooltip
    //     const tooltip = campoRBox.querySelector('.tooltip');
    //     if (tooltip) tooltip.remove();
    // });
});