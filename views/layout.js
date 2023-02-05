module.exports = ({ content, contentSignIn }) => {
    return `
    <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>U Barter</title>  
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">
        <link href="/css/style.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"></link>
        </head>

        <body>
        <nav>

        <img id="logo-barter" src="../images/logoBarter.png">
        <ul>
            <li><a href="/">Home</a></li>
            <div class="dropdown">
                <button onclick="dropdownFunction()" class="dropbtn">Categories</button>
                <div id="myDropdown" class="dropdown-content">
                    <input type="text" placeholder="Search.." id="myInput" onkeyup="filterFunction()">
                    <a href="#about">About</a>
                    <a href="#base">Base</a>
                    <a href="#blog">Blog</a>
                    <a href="#contact">Contact</a>
                    <a href="#custom">Custom</a>
                    <a href="#support">Support</a>
                    <a href="#tools">Tools</a>
                </div>
            </div>
            <li>|</li>
            <input id="search-bar" type="text" placeholder="Search..">
            <div class="burger-menu" onclick="burgerMenu();toggleNav()">
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
                
            </div>
            <div id="mySidenav" class="sidenav">
    <a href="javascript:void(0)" class="closebtn" onclick="burgerMenu();toggleNav()">&times;</a>
    <a href="/signin">Login</a>
    <a href="/signup">Register</a>
    <a href ="/cart">Favorites</a>
</div>

</div>
        </ul>
        </nav>
        <section class="section-spaces">
            ${content}
        </section>
       

        


       
        </body>

        <script>
        var sidenavIsOpen = false;
        function toggleNav() {
            if (sidenavIsOpen) {
                document.getElementById("mySidenav").style.width = "0";
            } else {
                document.getElementById("mySidenav").style.width = "250px";
            }
            sidenavIsOpen = !sidenavIsOpen;
        }

        function dropdownFunction() {
            document.getElementById("myDropdown").classList.toggle("show");
        }
    
        function filterFunction() {
            var input, filter, ul, li, a, i;
            input = document.getElementById("myInput");
            filter = input.value.toUpperCase();
            div = document.getElementById("myDropdown");
            a = div.getElementsByTagName("a");
            for (i = 0; i < a.length; i++) {
                txtValue = a[i].textContent || a[i].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    a[i].style.display = "";
                } else {
                    a[i].style.display = "none";
                }
            }
        }
    
        function burgerMenu() {
            document.getElementsByClassName("burger-menu")[0].classList.toggle("change");
        }
        </script>
    </html>
    `;

};
