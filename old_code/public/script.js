// process custom parameters 
function getQueryStringParams(query) {
    // Takes a query string and converts it to an object with key-value pairs
    return query
      ? (/^[?#]/.test(query) ? query.slice(1) : query)
          .split('&')
          .reduce((params, param) => {
              let [key, value] = param.split('=');
              params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
              return params;
          }, {}
      )
      : {};
    }

// Fetch the config from the server
function fetchConfig() {
    return fetch('/config')
      .then(response => response.json())
      .then(config => {
        initializeSupabase(config.supabaseUrl, config.supabaseAnonKey);
      })
      .catch(error => console.error('Error fetching config:', error));
  }
  
// Initialize Supabase with fetched config
function initializeSupabase(url, key) {
    if (!window.supabase) {
        console.error('Supabase library not loaded');
        return;
    }
    supabase = window.supabase.createClient(url, key);
    console.log('Supabase has been initialized');
    console.log(`Your URL = ${url} `);
    console.log(`Your KEY = ${key} `);
  }



// This function checks for 'topicName' parameter in the URL and auto-fills the mother's name input
function checkForAutoFill() {
    const params = new URLSearchParams(window.location.search);
    const topicNameFromQuery = params.get('topicName');
    if (topicNameFromQuery) {
        document.getElementById('topicName').value = topicNameFromQuery;
        generatePoem(); // Automatically generate the poem if the mother's name is passed in URL
    }
}


async function generatePoem_old() {
    const topicNameElement = document.getElementById('topicName');
    const heartIcon = document.getElementById('heart');
    const poemTitle = document.getElementById('poemTitle');
    const poemContent = document.getElementById('poemContent');
    const poemCard = document.getElementById('poemCard');
    
    if (!topicNameElement || !heartIcon || !poemTitle || !poemContent || !poemCard) {
        console.error('One or more elements are missing.');
        return;  // Exit if elements are not found
    }

    var topicName = topicNameElement.value.trim();
    if (topicName === "") {
        alert("Please enter your topic");
        return;
    }

    heartIcon.classList.remove('hidden'); // Show the heart icon

    try {
        const response = await fetch('/generate-poem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: topicName })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch poem');
        }

        const data = await response.json();
        //poemTitle.innerText = "Sketch for " + topicName; // Update title with name
        poemTitle.innerText = topicName; // Update title with name
        poemContent.innerText = data.poem;
        poemCard.classList.remove('hidden');
        // 10-1-2024 
        document.getElementById('playButton').style.display = 'block'; // Show play button
        heartIcon.classList.add('hidden'); // Hide the heart icon after poem is displayed
    } catch (error) {
        console.error('Error:', error);
        //alert('Error generating poem. Please try again.');
        heartIcon.classList.add('hidden'); // Ensure heart icon is hidden on error
    }
}

async function generatePoem() {
    const topicNameElement = document.getElementById('topicName');
    const contentTypeElement = document.getElementById('contentType');
    const heartIcon = document.getElementById('heart');
    const poemTitle = document.getElementById('poemTitle');
    const poemContent = document.getElementById('poemContent');
    const poemCard = document.getElementById('poemCard');
    
    if (!topicNameElement || !contentTypeElement || !heartIcon || !poemTitle || !poemContent || !poemCard) {
        console.error('One or more elements are missing.');
        return;  // Exit if elements are not found
    }

    var topicName = topicNameElement.value.trim();
    var contentType = contentTypeElement.value;

    if (topicName === "") {
        alert("Please enter your topic");
        return;
    }

    heartIcon.classList.remove('hidden'); // Show the heart icon

    try {
        const response = await fetch('/generate-poem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                name: topicName,
                contentType: contentType
            })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch content');
        }

        const data = await response.json();
        poemTitle.innerText = topicName; // Update title with name
        poemContent.innerText = data.poem; // You might want to rename this variable if it's not always a poem
        poemCard.classList.remove('hidden');
        document.getElementById('playButton').style.display = 'block'; // Show play button
        document.getElementById('playButtonPro').style.display = 'block'; // Show playPro button
        heartIcon.classList.add('hidden'); // Hide the heart icon after content is displayed
    } catch (error) {
        console.error('Error:', error);
        heartIcon.classList.add('hidden'); // Ensure heart icon is hidden on error
    }
}


document.addEventListener('DOMContentLoaded', function() {
    checkForAutoFill(); // Call this function when the DOM is fully loaded
    document.getElementById('composeButton').addEventListener('click', generatePoem);
});


// 10-1-2024 Google TTS Play the poem (comedy script) as speech

// 10-5-2024 Enhanced to support multiple TTS endpoints (11Labs)

async function playSpeech(service = 'google') {
    const poemContent = document.getElementById('poemContent').innerText;
    const endpoint = service === 'elevenlabs' ? '/synthesize-speech-11labs' : '/synthesize-speech';
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: poemContent })
      });
      const data = await response.json();
      const audioPlayer = document.getElementById('audioPlayer');
      audioPlayer.src = data.audioUrl;
      audioPlayer.style.display = 'block';
      audioPlayer.play();
    } catch (error) {
      console.error('Error playing speech:', error);
      alert('Error playing audio. Please try again.');
    }
  }


/*
document.addEventListener('DOMContentLoaded', function() {
    var composeButton = document.getElementById('composeButton'); // Ensure this is the correct ID for your compose button
    composeButton.addEventListener('click', async function generatePoem() {
        var topicName = document.getElementById('topicName').value.trim();
        if (topicName === "") {
            alert("Please enter mom's name.");
            return;
        }

        document.getElementById('heart').classList.remove('hidden'); // Show the heart icon

        try {
            const response = await fetch('/generate-poem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: topicName })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch poem');
            }

            const data = await response.json();
            document.getElementById('nameDisplay').innerText = topicName;
            document.getElementById('poemTitle').innerText = "Poem for " + topicName; // Update title with name
            document.getElementById('poemContent').innerText = data.poem;
            document.getElementById('poemCard').classList.remove('hidden');
            document.getElementById('heart').classList.add('hidden'); // Hide the heart icon after poem is displayed
        } catch (error) {
            console.error('Error:', error);
            //alert('Error generating poem. Please try again.');
            document.getElementById('heart').classList.add('hidden'); // Ensure heart icon is hidden on error
        }
    });
});
*/
