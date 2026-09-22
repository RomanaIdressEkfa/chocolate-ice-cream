import { FaDribbble, FaBehance, FaInstagram, FaFacebookF } from 'react-icons/fa6';

const socials = [
  { label: 'Dribbble', href: '#dribbble', Icon: FaDribbble },
  { label: 'Behance', href: '#behance', Icon: FaBehance },
  { label: 'Instagram', href: '#instagram', Icon: FaInstagram },
  { label: 'Facebook', href: '#facebook', Icon: FaFacebookF },
];

export default function BottomBar() {
  return (
    <div className="bottom-bar" data-intro="bottom">
      <div className="bottom-bar__inner">
        <ul className="socials">
          {socials.map(({ label, href, Icon }) => (
            <li key={label}>
              <a href={href} aria-label={label}>
                <Icon />
              </a>
            </li>
          ))}
        </ul>

        <a className="contact-link" href="#contact">
          Contact us
        </a>
      </div>
    </div>
  );
}
