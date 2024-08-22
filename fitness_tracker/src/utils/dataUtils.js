export default async function getData(path, method) {
    const response = await fetch('http://localhost:4001' + path,  {method: method});
    return response;
}
