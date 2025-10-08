
        
        // Get the elements for display
        const ipDisplayElement = document.getElementById('ip-display');
        const statusElement = document.getElementById('status-message');

        /**
         * Fetches the user's public IP address using a third-party API.
         * @param {boolean} isRefresh - True if called by the refresh button.
         */
         async function fetchUserIP(isRefresh = false) {
            const loadingText = isRefresh ? "" : "";
    
            
            // Set initial loading state
            statusElement.textContent = loadingText;
            ipDisplayElement.textContent = "";
            statusElement.classList.remove('text-green-600', 'text-red-600');
            statusElement.classList.add('text-yellow-600');


            // We use a free, public service (ipify) to get the IP address
            const apiUrl = 'https://api.ipify.org?format=json';

            try {
                // Fetch the data
                const response = await fetch(apiUrl);

                // Check for HTTP errors (404, 500, etc.)
                if (!response.ok) {
                    throw new Error(`API Request Failed: HTTP status ${response.status}`);
                }
                
                // Parse the JSON response
                const data = await response.json();
                const ipAddress = data.ip;
setTimeout(() => {
                // Update the display for success
                ipDisplayElement.textContent = ipAddress;
                statusElement.classList.remove('text-yellow-600', 'text-red-600');
                statusElement.classList.add('text-green-600');
}, 21500);
    
            } catch (error) {
                // Handle any network or parsing errors
                console.error("Error fetching IP:", error);
                
                // Update the display for error
                statusElement.classList.remove('text-green-600', 'text-yellow-600');
                statusElement.classList.add('text-red-600');
            }
        }

        // Call the function when the page is fully loaded
        window.onload = () => fetchUserIP(false);
    