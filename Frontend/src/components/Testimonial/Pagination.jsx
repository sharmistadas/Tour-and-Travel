import { useState } from "react";
import "./Pagination.css";

const Pagination = () => {
    const [activePage, setActivePage] = useState(1);

    return (
        <div className="pagination-wrapper">
            <div className="pagination">
                {[1, 2, 3].map((num) => (
                    <span
                        key={num}
                        className={activePage === num ? "active" : ""}
                        onClick={() => setActivePage(num)}
                    >
                        {num}
                    </span>
                ))}

                <span className="arrow">›</span>
            </div>
        </div>
    );
};

export default Pagination;
