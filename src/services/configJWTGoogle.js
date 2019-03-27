var KJUR = window.KJUR;

var trioIss = "updados@updados.iam.gserviceaccount.com";
var trioKey =
  "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCxMMgXOvOdtzgC\nQkS14vRqcGz1FPghLkDeIf4YR7Ul+gTlNnOgg6Hk0CnUoHyB77+2GtFkA8I/97wO\n39jLQYCZ/2ci1PMiX6EAYa6x3tAVfQAf/ILyiallKTIOnII+nO5yZ0JD+JffsHEN\nrgFDCHc7Eb+8fdlKo14XzT/g907sWCq1tfB4x85LdtpzIAad8/86wnWEqzzvZLyd\ntbW6FY7EKJ41m+A2jMfwo6zyeVyxA98F3WGeBeuHII6ySBQ5cspwRlXXHtsQCzr2\nvVJmWD36J71DLi36Za5ycZJKSd4yqinfNxXp42d3F/Jh1W7gBXKz7QMEA86vQZJw\nR3AH70OvAgMBAAECggEAG3CHe/l4IpNuDAOBKn2kBhu089s0dcb46q1u8QmhxujJ\n+0kMbO4Vkx6da70SqviawrOye3+NhGRz7gXCR++z36VKrn01zbvrbeiyqf7sUHeU\nHl/3U2H4Jp9Tjim0jce1sWfGPkpwEob7avfoYB4egLpF7AW9Ma7M8nipjMgfo7/c\n2gnfeEXxCX5sRvCsK+3RBULRfBMpAo3zUIv2pa3MhOZBZf1jxr4K8SYQfGLJ2mjH\nL3m2QHdW+aexdX+PnMWy6pHHA+y5QwX6Upi2k2YTL35zPBquCtjzhh/Ckj5uhgmc\nO5gjBheo59dlREA9heJQCgceDOA9HF3q/CjuZ4GEKQKBgQD4BZmaOjU/emn+lUeB\nDoWvoaKKVaJvB1d+iHSGP+Fj0CBjgJyQ+HFGH6N/9jSqOlbudfgNxwXARdrFubT8\nmSmsZD5ikHY67WuaksJ5is8IdDFDGKkEwfCfSOIWHF35Z92jq/fw3NSzlHil/wB2\nWULXh7NqNvsctIwqWYKR7ICQ4wKBgQC24+cgVjJ4ojKGOK3j27WFHzH12zK//Wrn\nMs9x4FmyQ2SeL1b+n3O5VHgGYY/IjhFRHSDjfKh0E8bNwj3Bk/5cXn8epNO6mg3M\nA4wIc+YR14wDS74Wl4CG39K3E+PaY1N3dtAXprStfarmFfYLnjKUACETt+n/bW1o\ncKuHP9U3xQKBgQCSdVwbArxm27azqxsqTpUK/XuqDJ96yO8VvSZyEE7cTg6SM2RB\nBzR8oDpAWfcHfqPO9MKiACCZRabGk78YWqmNLzTXp07pxUGBaaCFfT58U4CzimBk\netHIfZVkUSP9HyR2fhpPlVfVI5uLCmYPfO5Hr852rjji3orWhzzfRrU02QKBgFz9\nX8T3Ts47WgkYxIF4csDu7Y4eF526kiJfmU5DThfvYDd1xnvMQyDWK/jCnkLQyUk+\n0DwaY+QxMgHoY1ILl2cLvQKtt+HG9oDmxMp/c1lbCRub5VjDS1xIbXEcsduWaRfy\n1zdPUcpsfPpj7ChYFUtfDXJjLpzq3JgfwXcRI64pAoGAMp3slFD+XQT/87Tbtl47\nbWxOpsOQpdTXcwpLued6GkASt+OHrBP/5b/rGF4Nck76UvCTSW2dCOjKbxZoKE99\n7SCNdvDY54mjojtXZ5QglgGilx24qO2s2qgqiM+pHFNx5y0LL5PeYsBsJlmuZOYa\nOhFSMpT1TLc6xmNaILzaaPo=\n-----END PRIVATE KEY-----\n";

var pHeader = { alg: "RS256", typ: "JWT" };
var sHeader = JSON.stringify(pHeader);
var pClaim = {};
pClaim.aud = "https://www.googleapis.com/oauth2/v3/token";
pClaim.scope = "https://www.googleapis.com/auth/drive";
pClaim.iss = trioIss;
pClaim.exp = KJUR.jws.IntDate.get("now + 1hour");
pClaim.iat = KJUR.jws.IntDate.get("now");
var sClaim = JSON.stringify(pClaim);
var key = trioKey;
var sJWS = KJUR.jws.JWS.sign(null, sHeader, sClaim, key);
var urlEncodedDataPairs = [];
urlEncodedDataPairs.push(
  encodeURIComponent("grant_type") +
    "=" +
    encodeURIComponent("urn:ietf:params:oauth:grant-type:jwt-bearer")
);
urlEncodedDataPairs.push(
  encodeURIComponent("assertion") + "=" + encodeURIComponent(sJWS)
);
export const urlEncodedData = urlEncodedDataPairs
  .join("&")
  .replace(/%20/g, "+");

export const config = {
  headers: { "Content-Type": "application/x-www-form-urlencoded" }
};
