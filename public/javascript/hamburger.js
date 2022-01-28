const toggleButton = document.getElementsByClassName('toggle-button')[0]
        const navbarLinks = document.getElementsByClassName('nav_links')[0]
        toggleButton.addEventListener('click', () => {
            navbarLinks.classList.toggle('active')
        });

        // To auto close Expanded Hamburger when an event is clicked
        for(var i=0;i<=4;i++)
        {
        const listItems = document.querySelectorAll('.nav_links li')[i]
        listItems.addEventListener('click', () => {
            navbarLinks.classList.toggle('active')
        });}
        const buton = document.getElementsByClassName('first-button')[0]
        buton.addEventListener('click',() => {
            navbarLinks.classList.toggle('active')
        });