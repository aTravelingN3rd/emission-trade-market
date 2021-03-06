app.factory('Company', function ($http){

    return {

        // http://localhost:3000/api/queries/selectCompanyByName?name=user2

        buy: function(body, success, error) {
            $http.post('http://localhost:3000/api/Buy', body).then(
                success,
                function(response){
                    console.debug('buy: '+JSON.stringify(response.data));
                }
            );
        },

        sell: function(body, success, error) {
            console.debug("sell body"+JSON.stringify(body));
            $http.post('http://localhost:3000/api/Sell', body).then(
                success,
                function(response){
                    console.debug('sell: '+JSON.stringify(response.data));
                }
            );
        },

        get_available: function(marketid, success, error) {
            $http.get('http://localhost:3000/api/Market/'+marketid).then(
                function(response) {
                    success(response.data);
                },
                function(response){
                    console.debug('get market error');
                }
            );
        },

        get_limit: function(companyid, success, error) {
            $http.get('http://localhost:3000/api/Company/'+companyid).then(
                function(response) {
                    success(response.data);
                },
                function(response){
                    console.debug('get limit error');
                }
            );
        },

        get_onsale: function(ettid, success, error) {
            $http.get('http://localhost:3000/api/Ett/'+ettid).then(
                function(response) {
                    success(response.data);
                },
                function(response){
                    console.debug('get ett error');
                }
            );
        }
    };
});