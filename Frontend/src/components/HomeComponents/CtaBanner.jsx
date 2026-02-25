import "./CtaBanner.css";

function CtaBanner() {
    return (
        <section className="cta-outer">
            <div className="cta-inner">
                <div className="cta-overlay"></div>

                <div className="cta-content">
                    <h2>WE ARE PACIFIC A TRAVEL AGENCY</h2>
                    <p>
                        We can manage your dream building A small river named Duden flows by
                        their place
                    </p>
                    {/* <button></button> */}
                    <a href="/contact">Ask For A Quote</a>
                </div>
            </div>
        </section>
    );
}

export default CtaBanner;
