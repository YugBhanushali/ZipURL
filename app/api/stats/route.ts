

export async function GET(req: Request){
    const res = await fetch('https://codetoimg.vercel.app');
    console.log(res);
    return new Response('Hello World');
}