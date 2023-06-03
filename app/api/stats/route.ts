

export async function GET(req: Request){
    const pathName = new URL(req.url);
    console.log(pathName.searchParams.get('shorturl'));
    return new Response('Hello World');
}