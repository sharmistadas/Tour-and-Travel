import "./SplitSection.css";

export default function SplitSection() {
  return (
    <section className="split">
      {/* LEFT IMAGE SIDE */}
      <div className="split-left">
        <div className="split-left-content">
          <div className="item">
            <h4>Ornare Quam Justo Tellusv</h4>
            <p>
              Maecenas faucibus mollis interdum. Donec id elit non mi porta
              gravida at eget metus. Aenean lacinia.
            </p>
          </div>

          <div className="item">
            <h4>Pellentesque Magna Venenatis</h4>
            <p>
              Maecenas faucibus mollis interdum. Donec id elit non mi porta
              gravida at eget metus. Aenean lacinia.
            </p>
          </div>

          <div className="item">
            <h4>Magna Nibh Commodo</h4>
            <p>
              Maecenas faucibus mollis interdum. Donec id elit non mi porta
              gravida at eget metus. Aenean lacinia.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT WHITE SIDE */}
      <div className="split-right">
        <h2 className="tour-title">
          Sollicitudin Vestibulum
          <br />
          Vulputate Ipsum
        </h2>

        <p className="lead">
          Etiam porta sem malesuada magna mollis euismod. Vivamus sagittis lacus
          vel augue laoreet rutrum faucibus dolor auctor.
        </p>

        <p>
          Maecenas faucibus mollis interdum. Donec id elit non mi porta gravida
          at eget metus. Aenean lacinia. Donec ullamcorper nulla non metus
          auctor fringilla.
        </p>

        <button className="quote-btn">Get A Quote</button>
      </div>
    </section>
  );
}
