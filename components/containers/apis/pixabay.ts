import { PixabayImage } from "..";

const pixaDB: PixabayImage[] = [];

export async function buscarImagenes(query: string): Promise<PixabayImage[]> {
  const API_KEY = "33461008-7e6d1546b7d6e2a4b58ac93a3";
  const PIXABAY_API_URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}`;

  try {
    const response = await fetch(PIXABAY_API_URL);
    if (!response.ok) {
      throw new Error("No se pudo obtener una respuesta de la API");
    }

    const responseData = await response.json();
    const images = responseData.hits; // Suponiendo que la respuesta tiene una propiedad "hits" que contiene las imágenes

    if (!images || images.length === 0) {
      throw new Error(
        "No se encontraron imágenes para la consulta proporcionada"
      );
    }

    const newImages: PixabayImage[] = [];
    for (const image of images) {
      // Verificar si la imagen ya existe en pixaDB
      const existingPixaIndex = pixaDB.findIndex(
        (pixa) => pixa.id === image.id
      );

      if (existingPixaIndex === -1) {
        // Si la imagen no existe en pixaDB, agregarla
        const pix: PixabayImage = {
          id: image.id,
          nombre: "Imagen Artistica",
          webformatURL: image.webformatURL,
          tags: image.tags,
          precio: 100,
        };

        pixaDB.push(pix);
        newImages.push(pix);
      }
    }
    return newImages;
  } catch (error) {
    console.error("Error al buscar imágenes en Pixabay:", error);
    throw error;
  }
}

export default pixaDB;
