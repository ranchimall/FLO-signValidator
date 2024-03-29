# FLO-signValidator
This nodejs Server will verify the signature sent via POST request.


## Installation (for server host only)
### Pre-requisite
- [X] Nodejs `version >= 12.9`
### Download
Download the repository using git:
```
git clone https://github.com/ranchimall/FLO-signValidator.git
```
### Starting the server
The server can be started using the following command
```
node ./start.js
```
The default port is 8080. To host the server in different port, pass the port number in command line argument as shown below
```
node ./start.js <port>
```

## Usage (for clients)
The POST request must consist of a JSON string with the following:
- floID: floID of the signer.
- pubKey: pubKey of the signer.
- message: message that was signed.
- sign: sigature generated by signing using the private key of the signer.

The above values can be generated using [Standard Operations](https://github.com/ranchimall/Standard_Operations)

## Examples

** Python **
``` 
import requests

url = 'https://flo-sign-validator.duckdns.org'
myobj = {'floID': floID,
            'pubKey': pubKey,
            'message': message,
            'sign': sign}

x = requests.post(url, json = myobj)
print(x.text)

```

** JavaScript **
``` 
fetch("https://flo-sign-validator.duckdns.org", {
  method: "POST",
  body: JSON.stringify({
    floID: floID,
    pubKey: pubKey,
    message: message,
    sign: sign
  })
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
  .catch((error) => console.error("Error:", error));

```

** PHP **
```
            function callAPI($method, $url, $data){
            $curl = curl_init();
            switch ($method){
                case "POST":
                    curl_setopt($curl, CURLOPT_POST, 1);
                    if ($data)
                        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
                    break;
                case "PUT":
                    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
                    if ($data)
                        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);                              
                    break;
                default:
                    if ($data)
                        $url = sprintf("%s?%s", $url, http_build_query($data));
            }
            // OPTIONS:
            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_HTTPHEADER, array(
                'APIKEY: 111111111111111111111',
                'Content-Type: application/json',
            ));
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
            // EXECUTE:
            $result = curl_exec($curl);
            curl_close($curl);
            return $result;
            }
            
            $floID = $_POST['floID'];
            $pubKey = $_POST['floPubKey'];
            $message = $_POST['message'];
            $signDataWithFlo = $_POST['signDataWithFlo'];
    
    
            $data_array =  array( "floID"        => $floID, "pubKey" => $pubKey, "message" => $message, "sign" => $signDataWithFlo  );
            $make_call = callAPI('POST', 'https://flo-sign-validator.duckdns.org', json_encode($data_array));
            $response = json_decode($make_call, true);
            
            print_r($response);

```
            
