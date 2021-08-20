const accountInfo = document.getElementById('accountInfo ')

accountInfo.addEvenetListener('submit', function(e) {
            e.preventDefault();

            const formData = FormData(this);

            fetch({
                "username": string,
                "password": string
            }).then(funtion(response), {
                return: response.text(),
            }).then(function(text) {
                console.log(text);
            }).catch(function(error) {
                conolse.error(error);
            });