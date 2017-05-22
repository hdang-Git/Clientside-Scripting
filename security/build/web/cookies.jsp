<!DOCTYPE html>
<html>
    <head>
        <title>Cookie Example</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <style>
            body {background-color: khaki; font-family:arial; font-size:16px; font-weight:bold;}
            input {
                padding:4px;
                margin-top:4px;
                font-size:16px; 
            }
        </style>
        <script>

            function setCookieValue(name, value, days) {
                alert("Adding (to cookie): " + name + " = " + value + "\n\n" + "will last " + days + " days");
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    var expires = "; expires=" + date.toGMTString();
                } else
                    var expires = "";
                document.cookie = name + "=" + value + expires + "; path=/";
            }

            function getCookieValue(name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ')
                        c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) == 0)
                        return c.substring(nameEQ.length, c.length);
                }
                return null;
            }

            function eraseCookieValue(name) {
                setCookieValue(name, "", -1);
            }

            function showCookieValue(name) {
                var val = getCookieValue(name);
                if (val == null) {
                    alert("There is no cookie value named '" + name + "'");
                } else {
                    alert(name + " = " + val);
                }
            }

            function showWholeCookie() {
                alert("whole cookie is " + document.cookie);
            }

        </script>
    </head>


    <body>
        <div>
            <h1>Cookie Example</h1>
            
            <form name="myForm">
                Cookie Name: <input type="text" name="cookieNameToSet"/>
                <br/>
                Cookie Value: <input type="text" name="cookieValueToSet"/>
                <br/>
                Cookie Days: <input type="text" name="cookieDaysToSet" value="10"/>
                <br/>
                <input type="button" value="Set Cookie with Name/Value Pair above (lasts so many days)" 
                       onclick="javascript:setCookieValue(document.myForm.cookieNameToSet.value,
                                       document.myForm.cookieValueToSet.value,
                                       document.myForm.cookieDaysToSet.value)">
                <br/>
                <br/>
                <br/>
                <br/>
                Get the Value for this Name: <input type="text" name="cookieNameToRead"/>
                <br/>
                <input type="button" value="Get the Value of the Name (typed above) from the Cookie" 
                       onclick="javascript:showCookieValue(document.myForm.cookieNameToRead.value)">
                <br/>
                <br/>
                <br/>
                <br/>
                <input type="button" value="Show Whole Cookie (All Values)" 
                       onclick="javascript:showWholeCookie()">
            </form>
        </div>
    </body>
</html>

