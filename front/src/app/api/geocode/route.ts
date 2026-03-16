// app/api/geocode/route.ts
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
  
    if (!lat || !lng) {
      return Response.json({ error: 'Missing lat/lng' }, { status: 400 });
    }

    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);

    if (isNaN(latNum) || isNaN(lngNum)) {
      return Response.json({ error: 'Invalid lat/lng' }, { status: 400 });
    }
  
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latNum}&lon=${lngNum}&format=json`,
      { headers: { 'User-Agent': 'TonApp/1.0' } }
    );
    const data = await res.json();
  
    const city =
      data.address?.city ||
      data.address?.town ||
      data.address?.village;
    const country = data.address?.country;
  
    if (!city || !country) {
      return Response.json({ error: 'Location not found' }, { status: 404 });
    }
  
    return Response.json({ location: `${city}, ${country}` });
  }