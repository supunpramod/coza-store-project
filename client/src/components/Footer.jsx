import { FaFacebook, FaInstagram, FaPinterestP, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black pt-20 pb-8 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h4 className="text-xl mb-6">Categories</h4>
            <ul className="space-y-2">
              {['Women', 'Men', 'Shoes', 'Watches'].map((cat) => (
                <li key={cat}><a href="#" className="hover:text-pink-400">{cat}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xl mb-6">Help</h4>
            <ul className="space-y-2">
              {['Track Order', 'Returns', 'Shipping', 'FAQs'].map((item) => (
                <li key={item}><a href="#" className="hover:text-pink-400">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xl mb-6">GET IN TOUCH</h4>
            <p className="mb-4">
              Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or call us on (+1) 96 716 6879
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-pink-400"><FaFacebook /></a>
              <a href="#" className="hover:text-pink-400"><FaInstagram /></a>
              <a href="#" className="hover:text-pink-400"><FaPinterestP /></a>
            </div>
          </div>
          <div>
            <h4 className="text-xl mb-6">Newsletter</h4>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full px-4 py-2 bg-transparent border border-gray-500 text-white placeholder-gray-400"
              />
              <button className="w-full px-4 py-2 bg-white text-black hover:bg-blue-500 rounded-md">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="flex justify-center items-center mt-10 space-x-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <img key={n} src={`/images/icons/icon-pay-0${n}.png`} alt={`ICON-PAY-${n}`} className="h-6" />
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          &copy; {new Date().getFullYear()} All rights reserved | Made with <FaHeart className="inline text-pink-400" /> by <a href="https://colorlib.com" className="hover:underline">Colorlib</a> & distributed by <a href="https://themewagon.com" className="hover:underline">ThemeWagon</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
