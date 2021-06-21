import axios from "axios"
import { URLSearchParams } from "url"

const loginFormData = new URLSearchParams()
loginFormData.append("UserName", "jackholmes5194@gmail.com")
loginFormData.append("Password", "wcn3^e*KypnL*%=]y8")
loginFormData.append("AuthMethod", "FormsAuthentication")

axios
    .post(
        "https://federation.aucklandtransport.govt.nz/adfs/oauth2/authorize",
        loginFormData.toString(),
        {
            params: {
                response_type: "code",
                client_id: "7cf5bc65-d330-4a15-8966-29202364d66e",
                redirect_uri:
                    "https://atpark.at.govt.nz/landing&resource=https://atpark.at.govt.nz/IDM/API",
            },
            headers: {
                Host: "federation.aucklandtransport.govt.nz",
                Origin: "https://federation.aucklandtransport.govt.nz",
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36",
                Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                // Sec-GPC: 1,
                // Sec-Fetch-Site: "same-origin",
                // Sec-Fetch-Mode: "navigate",
                Referer:
                    "https://federation.aucklandtransport.govt.nz/adfs/oauth2/authorize?response_type=code&client_id=7cf5bc65-d330-4a15-8966-29202364d66e&redirect_uri=https%3a%2f%2fatpark.at.govt.nz%2flanding&resource=https%3a%2f%2fatpark.at.govt.nz%2fIDM%2fAPI",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "en-US,en;q=0.9",
                Cookie: "TS01c88207_26=01826544fc3ea830d2958628d83c96c0491f99df543bd1be84a5cae503a0397765637225f18871535a6db800ab40fd6351941c5be553ef62c0a4d7b3e8efdf03335027fc80; TS01c88207=01741fefded92064c699068b4cd148173ab396762f4b0745f47af44cfd68471c479d23c56f7845cf137b2d83b3a3eb1b6ad0054909",
            },
        }
    )
    .then((response) => console.log(response))

// axios
//     .post(
//         "https://federation.aucklandtransport.govt.nz/adfs/oauth2/authorize?response_type=code&client_id=7cf5bc65-d330-4a15-8966-29202364d66e&redirect_uri=https%3a%2f%2fatpark.at.govt.nz%2flanding&resource=https%3a%2f%2fatpark.at.govt.nz%2fIDM%2fAPI",
//         "UserName=jackholmes5194%40gmail.com&Password=wcn3%5Ee*KypnL*%25%3D%5Dy8&AuthMethod=FormsAuthentication",
//         {
//             headers: {
//                 accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
//                 "accept-language": "en-US,en;q=0.9",
//                 "cache-control": "max-age=0",
//                 "content-type": "application/x-www-form-urlencoded",
//                 "sec-fetch-dest": "document",
//                 "sec-fetch-mode": "navigate",
//                 "sec-fetch-site": "same-origin",
//                 "sec-fetch-user": "?1",
//                 "sec-gpc": "1",
//                 "upgrade-insecure-requests": "1",
//                 cookie: "TS01c88207_26=01826544fc3ea830d2958628d83c96c0491f99df543bd1be84a5cae503a0397765637225f18871535a6db800ab40fd6351941c5be553ef62c0a4d7b3e8efdf03335027fc80; TS01c88207=01741fefded92064c699068b4cd148173ab396762f4b0745f47af44cfd68471c479d23c56f7845cf137b2d83b3a3eb1b6ad0054909",
//                 referer:
//                     "https://federation.aucklandtransport.govt.nz/adfs/oauth2/authorize?response_type=code&client_id=7cf5bc65-d330-4a15-8966-29202364d66e&redirect_uri=https%3a%2f%2fatpark.at.govt.nz%2flanding&resource=https%3a%2f%2fatpark.at.govt.nz%2fIDM%2fAPI",
//                 referrerPolicy: "strict-origin-when-cross-origin",
//             },
//         }
//     )
//     .then((response) => console.log(response))

// // fetch(
// //         "https://federation.aucklandtransport.govt.nz/adfs/oauth2/authorize?response_type=code&client_id=7cf5bc65-d330-4a15-8966-29202364d66e&redirect_uri=https%3a%2f%2fatpark.at.govt.nz%2flanding&resource=https%3a%2f%2fatpark.at.govt.nz%2fIDM%2fAPI",
// //         {
// //                 headers: {
// //                         accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
// //                         "accept-language": "en-US,en;q=0.9",
// //                         "cache-control": "max-age=0",
// //                         "content-type": "application/x-www-form-urlencoded",
// //                         "sec-fetch-dest": "document",
// //                         "sec-fetch-mode": "navigate",
// //                         "sec-fetch-site": "same-origin",
// //                         "sec-fetch-user": "?1",
// //                         "sec-gpc": "1",
// //                         "upgrade-insecure-requests": "1",
// //                         cookie: "TS01c88207_26=01826544fc3ea830d2958628d83c96c0491f99df543bd1be84a5cae503a0397765637225f18871535a6db800ab40fd6351941c5be553ef62c0a4d7b3e8efdf03335027fc80; TS01c88207=01741fefded92064c699068b4cd148173ab396762f4b0745f47af44cfd68471c479d23c56f7845cf137b2d83b3a3eb1b6ad0054909",
// //                 },
// //                 referrer:
// //                         "https://federation.aucklandtransport.govt.nz/adfs/oauth2/authorize?response_type=code&client_id=7cf5bc65-d330-4a15-8966-29202364d66e&redirect_uri=https%3a%2f%2fatpark.at.govt.nz%2flanding&resource=https%3a%2f%2fatpark.at.govt.nz%2fIDM%2fAPI",
// //                 referrerPolicy: "strict-origin-when-cross-origin",
// //                 body: "UserName=jackholmes5194%40gmail.com&Password=wcn3%5Ee*KypnL*%25%3D%5Dy8&AuthMethod=FormsAuthentication",
// //                 method: "POST",
// //                 mode: "cors",
// //         }
// // ).then((response) => console.log(response))
