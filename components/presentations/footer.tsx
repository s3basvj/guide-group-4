"use client";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 mt-8 ">
      <div className="container mx-auto flex justify-center">
        <div className="container mx-auto flex-col justify-center text-center">
          <div className="flex justify-center content-center items-center space-x-1">
            <a href="https://www.facebook.com/" target="_blank">
              <img
                src="https://img.icons8.com/fluency/48/facebook-new.png"
                alt="facebook"
              />
            </a>
            <a href="https://twitter.com/" target="_blank">
              <img
                src="https://img.icons8.com/ffffff/ios-filled/48/twitterx--v1.png"
                alt="twitterx"
              />
            </a>
            <a href="https://www.instagram.com/" target="_blank">
              <img
                width="52"
                height="52"
                src="https://img.icons8.com/fluency/48/instagram-new.png"
                alt="instagram"
              />
            </a>
          </div>
          <p>
            &copy; {new Date().getFullYear()} Mi Tienda de Imágenes. Todos los
            derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;