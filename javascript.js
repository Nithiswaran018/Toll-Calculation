// Optional: You can add more factors and explanations as needed
const factors = {
    distance: 'Tolls often depend on the distance traveled on a toll road.',
    vehicleType: 'Toll rates may vary based on the type of vehicle.',
    peakHours: 'Toll rates can be higher during peak hours and lower during off-peak hours.',
};

document.addEventListener('DOMContentLoaded', function () {
    for (const factor in factors) {
        const element = document.getElementById(factor);
        element.addEventListener('mouseover', function () {
            showTooltip(element, factors[factor]);
        });
        element.addEventListener('mouseout', function () {
            hideTooltip(element);
        });
    }
});

function showTooltip(element, text) {
    const tooltip = element.querySelector('.tooltiptext');
    tooltip.innerText = text;
    tooltip.style.visibility = 'visible';
    tooltip.style.opacity = 1;
}

function hideTooltip(element) {
    const tooltip = element.querySelector('.tooltiptext');
    tooltip.style.visibility = 'hidden';
    tooltip.style.opacity = 0;
}
