document.addEventListener('DOMContentLoaded', () => {
    const themeSelector = document.getElementById('theme-selector');
    const root = document.documentElement;
    const currentTimeDisplay = document.getElementById('current-time');

    const themes = [
        { name: "Default Green", bg: "#0D0D0D", text: "#00FF41", link: "#FFA500", hover: "#FFD700", border: "#333333", header: "#00FF41" },
        { name: "Amber CRT", bg: "#000000", text: "#FFB000", link: "#00FF00", hover: "#33FF33", border: "#4A4A4A", header: "#FFB000" },
        { name: "Blue Phosphor", bg: "#00001A", text: "#00BFFF", link: "#FFFF00", hover: "#FFFFAA", border: "#000050", header: "#00BFFF" },
        { name: "White Terminal", bg: "#101010", text: "#E0E0E0", link: "#7DF9FF", hover: "#00FFFF", border: "#505050", header: "#E0E0E0" },
        { name: "ZX Spectrum", bg: "#0000D7", text: "#FFFF00", link: "#FF0000", hover: "#FF5555", border: "#0000AA", header: "#FFFF00" },
        { name: "C64", bg: "#404878", text: "#A0A8D8", link: "#80FFFF", hover: "#FFFFFF", border: "#202858", header: "#B0B8E8" },
        { name: "Monochrome Paper", bg: "#F0F0F0", text: "#1A1A1A", link: "#0000FF", hover: "#0000AA", border: "#CCCCCC", header: "#000000" },
        { name: "Hacker Haze", bg: "#2C3E50", text: "#BDC3C7", link: "#1ABC9C", hover: "#16A085", border: "#34495E", header: "#ECF0F1" },
        { name: "Ruby Glow", bg: "#2B0000", text: "#FF7F7F", link: "#FFFF99", hover: "#FFFFCC", border: "#550000", header: "#FFBFBF" },
        { name: "Goldenrod Console", bg: "#3A2A00", text: "#DAA520", link: "#F0E68C", hover: "#FFFFE0", border: "#5C4000", header: "#FFD700" },
        { name: "Matrix Rains", bg: "#001A00", text: "#33FF33", link: "#00AA00", hover: "#00CC00", border: "#003300", header: "#66FF66" },
        { name: "Arctic Code", bg: "#2E2E3A", text: "#E0FFFF", link: "#87CEFA", hover: "#B0E0E6", border: "#46465A", header: "#ADD8E6" },
        { name: "Vintage VT100", bg: "#222222", text: "#A2BBA2", link: "#FFFFB0", hover: "#FFFFDD", border: "#444444", header: "#B2CB92" },
        { name: "Teletext Dream", bg: "#000000", text: "#00FFFF", link: "#FFFF00", hover: "#FFFFFF", border: "#3333FF", header: "#FFFFFF" },
        { name: "Burnt Sienna", bg: "#3D1B0B", text: "#E9967A", link: "#FFDEAD", hover: "#FFEBCD", border: "#6B2F1A", header: "#FFA07A" }
    ];

    function applyTheme(theme) {
        root.style.setProperty('--bg-color', theme.bg);
        root.style.setProperty('--text-color', theme.text);
        root.style.setProperty('--link-color', theme.link);
        root.style.setProperty('--link-hover-color', theme.hover);
        root.style.setProperty('--border-color', theme.border);
        root.style.setProperty('--header-text-color', theme.header);
        root.style.setProperty('--cursor-color', theme.text); // Cursor same as text color
    }

    function populateThemes() {
        themes.forEach(theme => {
            const option = document.createElement('option');
            option.value = theme.name;
            option.textContent = theme.name;
            themeSelector.appendChild(option);
        });
    }

    function loadSavedTheme() {
        const savedThemeName = localStorage.getItem('selectedTheme');
        if (savedThemeName) {
            const theme = themes.find(t => t.name === savedThemeName);
            if (theme) {
                applyTheme(theme);
                themeSelector.value = savedThemeName;
            } else { // Fallback if saved theme name is invalid
                 applyTheme(themes[0]); // Apply default theme
            }
        } else {
            applyTheme(themes[0]); // Apply default theme if no theme saved
        }
    }

    themeSelector.addEventListener('change', (event) => {
        const selectedThemeName = event.target.value;
        const theme = themes.find(t => t.name === selectedThemeName);
        if (theme) {
            applyTheme(theme);
            localStorage.setItem('selectedTheme', selectedThemeName);
        }
    });
    
    function updateTime() {
        if (currentTimeDisplay) {
            const now = new Date();
            currentTimeDisplay.textContent = `SYSTEM_TIME: ${now.toLocaleTimeString()}`;
        }
    }

    // Initialize
    populateThemes();
    loadSavedTheme();
    updateTime(); // Initial time update
    setInterval(updateTime, 1000); // Update time every second
});
