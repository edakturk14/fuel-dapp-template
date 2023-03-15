export const ResourcesLinks = () => {
  return (
    <div className="gap-4 mt-10 columns1 md:columns-2 container-md">
      <div className="card w-full max-w-sm card-bordered shadow-xl mb-4 hover:bg-primary hover:text-black transition-colors">
        <a
          href="https://fuelbook.fuel.network/master/index.html"
          rel="noreferrer"
          target="_blank"
        >
          <div className="card-body">
            <h2 className="card-title">Fuel Book {"->"}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </a>
      </div>

      <div className="card w-full max-w-sm card-bordered shadow-xl mb-4 hover:bg-primary hover:text-black transition-colors">
        <a
          href="https://fuellabs.github.io/sway/v0.35.5/book/"
          rel="noreferrer"
          target="_blank"
        >
          <div className="card-body">
            <h2 className="card-title">Sway Book {"->"}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </a>
      </div>

      <div className="card w-full max-w-sm card-bordered shadow-xl mb-4 hover:bg-primary hover:text-black transition-colors">
        <a
          href="https://fuellabs.github.io/fuels-ts/"
          rel="noreferrer"
          target="_blank"
        >
          <div className="card-body">
            <h2 className="card-title">Fuel Typescript SDK {"->"}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </a>
      </div>

      <div className="card w-full max-w-sm card-bordered shadow-xl mb-4 hover:bg-primary hover:text-black transition-colors">
        <a
          href="https://eda.hashnode.dev/modular-blockchains-getting-started-with-fuel"
          rel="noreferrer"
          target="_blank"
        >
          <div className="card-body">
            <h2 className="card-title">Blog post {"->"}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </a>
      </div>
    </div>
  );
};
