let soundPlayed = false; // Ensure sound only plays once

async function fetchIPAddress() {
    try {
        const response = await fetch('https://api.ipdata.co/?api-key=2c3eec05908b1cb9de28f604b59185a418853af65c734900b902ed98');
        const data = await response.json();
        document.getElementById('ip-container').textContent = `Your IP Address: ${data.ip}`;
    } catch (error) {
        document.getElementById('ip-container').textContent = 'Unable to fetch your IP address.';
        console.error('Error fetching IP address:', error);
    }
}

async function fetchMoreInfo() {
    const moreInfoContainer = document.getElementById('more-info');
    try {
        const response = await fetch('https://api.ipdata.co/?api-key=2c3eec05908b1cb9de28f604b59185a418853af65c734900b902ed98'); // Alternative API for more details
        const data = await response.json();

        const googleMapsLink = `https://www.google.com/maps?q=${data.latitude},${data.longitude}`;

        const specs = `
            <p>Latitude: ${data.latitude}</p>
            <p>Longitude: ${data.longitude}</p>
            <p>City: ${data.city}</p>
            <p>Region: ${data.region}</p>
            <p>Country: ${data.country_name}</p>
            <p>User Agent: ${navigator.userAgent}</p>
            <p><a href="${googleMapsLink}" target="_blank">View on Google Maps</a></p>
        `;

        moreInfoContainer.innerHTML = specs + '<div id="note">Note: Your information is logged. Contact me via Discord if you wish to have it removed. <br>Contact: <a href="discord://discord.com/users/824444031903465473" class="discord-link">ArthurMSM2</a></div>';
    } catch (error) {
        moreInfoContainer.innerHTML = '<p>Unable to fetch more information.</p>';
        console.error('Error fetching more information:', error);
    }
}

document.getElementById('see-more').addEventListener('click', () => {
    const moreInfoContainer = document.getElementById('more-info');
    const seeMoreButton = document.getElementById('see-more');
    const isVisible = moreInfoContainer.classList.toggle('visible');

    if (!soundPlayed) {
        const audio = new Audio('https://www.soundjay.com/button/beep-07.mp3');
        audio.play().catch((error) => console.error('Error playing sound:', error));
        soundPlayed = true;
    }

    seeMoreButton.textContent = isVisible ? 'Close' : 'See more?';

    if (isVisible) {
        fetchMoreInfo();
    }
});

fetchIPAddress();