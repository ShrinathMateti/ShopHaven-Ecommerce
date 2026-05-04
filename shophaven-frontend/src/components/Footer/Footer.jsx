import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = ({ content }) => {
  return (
    <footer className="bg-black text-white px-6 py-16 relative overflow-hidden">

      <div className="relative flex flex-col md:flex-row justify-between gap-12">

        <div className="flex-1">
          <h1 className="text-5xl font-extrabold leading-tight">
            ShopHaven
          </h1>

          <p className="text-gray-400 mt-4 max-w-sm">
            Elevate your style with curated collections and modern fashion essentials.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-3 rounded-full bg-gray-900 hover:bg-white hover:text-black 
                           transition duration-300 hover:scale-110 shadow-lg"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
        <div className="flex-2 grid grid-cols-2 md:grid-cols-3 gap-10">

          {content?.items?.map((item, index) => (
            <div key={index}>
              
              <p className="text-lg font-semibold mb-3">
                {item?.title}
              </p>

              <div className="flex flex-col gap-2">
                {item?.list?.map((listItem, i) => (
                  <a
                    key={i}
                    href={listItem?.path}
                    className="text-sm text-gray-400 hover:text-white 
                               transition hover:translate-x-1"
                  >
                    {listItem?.label}
                  </a>
                ))}
              </div>

              {item?.description && (
                <p className="text-sm text-gray-400 mt-2">
                  {item?.description}
                </p>
              )}
            </div>
          ))}

        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} ShopHaven — Crafted for modern shoppers.
      </div>

    </footer>
  );
};

export default Footer;