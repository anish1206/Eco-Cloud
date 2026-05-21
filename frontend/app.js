document.addEventListener('DOMContentLoaded', () => {

    // --- Tab Navigation Logic ---
    const navItems = document.querySelectorAll('.nav-item');
    const contentAreas = document.querySelectorAll('.content-area');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            const targetId = item.getAttribute('data-target');
            contentAreas.forEach(area => {
                if (area.id === targetId) {
                    area.classList.add('active');
                    area.classList.remove('hidden');
                } else {
                    area.classList.remove('active');
                    area.classList.add('hidden');
                }
            });
        });
    });

    // --- Chart.js Global Settings ---
    Chart.defaults.color = '#94A3B8';
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.05)';

    // --- 1. Ensemble Weights (Doughnut Chart) ---
    const ctxWeights = document.getElementById('weightsChart').getContext('2d');
    new Chart(ctxWeights, {
        type: 'doughnut',
        data: {
            labels: ['Random Forest', 'Extra Trees', 'Gradient Boosting', 'Logistic Regression'],
            datasets: [{
                data: [0.5891, 0.2066, 0.1751, 0.0291],
                backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: { position: 'right', labels: { padding: 20 } },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return ` ${context.label}: ${(context.raw * 100).toFixed(2)}% weight`;
                        }
                    }
                }
            }
        }
    });

    // --- 2. Ablation Study Results (Bar Chart) ---
    // Data from PROJECT_COMPLETION_SUMMARY.md
    const ctxAblation = document.getElementById('ablationChart').getContext('2d');
    new Chart(ctxAblation, {
        type: 'bar',
        data: {
            labels: ['Full Ensemble (Baseline)', 'Without ET', 'Without GB', 'Without LR', 'Without RF'],
            datasets: [{
                label: 'Overall Score (Lower is Better)',
                data: [0.3857, 0.3897, 0.4083, 0.3666, 0.5903],
                backgroundColor: [
                    '#3B82F6', // Baseline
                    'rgba(59, 130, 246, 0.5)',
                    'rgba(59, 130, 246, 0.5)',
                    'rgba(59, 130, 246, 0.5)',
                    '#EF4444'  // Without RF (Huge spike)
                ],
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { 
                    beginAtZero: true,
                    title: { display: true, text: 'Overall Score', color: '#94A3B8' }
                },
                x: { grid: { display: false } }
            }
        }
    });

    // --- 3. Computational Overhead (Logarithmic Grouped Bar Chart) ---
    const ctxOverhead = document.getElementById('overheadChart').getContext('2d');
    new Chart(ctxOverhead, {
        type: 'bar',
        data: {
            labels: ['Mean Latency (ms)', 'P50 Latency (ms)', 'P95 Latency (ms)', 'P99 Latency (ms)'],
            datasets: [
                {
                    label: 'ML Ensemble',
                    data: [68.42, 62.01, 95.06, 175.13],
                    backgroundColor: '#F59E0B',
                    borderRadius: 4
                },
                {
                    label: 'Heuristic',
                    data: [0.0172, 0.001, 0.001, 0.9997], // using 0.001 instead of 0 to show on log scale slightly
                    backgroundColor: '#10B981',
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'top' } },
            scales: {
                y: {
                    type: 'logarithmic',
                    title: { display: true, text: 'Latency in ms (Log Scale)', color: '#94A3B8' },
                    ticks: {
                        callback: function(value) { return value + ' ms'; }
                    }
                },
                x: { grid: { display: false } }
            }
        }
    });

});
