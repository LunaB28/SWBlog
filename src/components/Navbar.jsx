import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-dark bg-black">
			<div className="container position-relative">
				<div className="d-flex justify-content-center w-100">
					<Link to="/">
						<img
							src="https://infonegocios.info/content/images/2023/10/24/415577/conversions/star-wars-impactmkt-medium-size.jpg"
							style={{ width: "300px" }}
							alt="Star Wars"
							navigation="/"
						/>
					</Link>
				</div>
				<Link to="/" className="d-flex">
					<span className="navbar-brand mb-0 h1 navtitle">Star Wars DataBank</span>
				</Link>
				   <div className="ml-auto">
					   <Link to="/saved">
						   <span className="navtext">Saved</span>
					   </Link>
					   <Link to="/favorites" className="mx-5">
						   <span className="navtext">Favorites</span>
					   </Link>
				   </div>
			</div>
		</nav>
	);
};