import '../../styles/widgets.css'
import '../../styles/dashboard.css'
import ConstellationWidget from "../constellation/constellationWidget.jsx";

const MOCK_STARS = ['Reply to emails', 'Gym session', 'Finish ZUI-2 ticket', 'Water plants'];
const MOCK_TRANSACTIONS = ['Coffee — £4.20', 'Groceries — £32.10', 'Uber — £11.00', 'Netflix — £7.99'];

export default function Widgets() {

    return (
        <div className="widget-grid">
            <ConstellationWidget />
            <div className="glass-panel widget-box">
                <span className="widget-title">My Stars</span>
                <ul className="widget-list">
                    {MOCK_STARS.length === 0 ? (
                        <li className="widget-list-empty">No stars yet</li>
                    ) : (
                        MOCK_STARS.map((s) => (
                            <li key={s} className="widget-list-item">{s}</li>
                        ))
                    )}
                </ul>
                <button className="widget-add-btn" type="button">+ Create star</button>
            </div>

            <div className="glass-panel widget-box">
                <span className="widget-title">Latest Transactions</span>
                <ul className="widget-list">
                    {MOCK_TRANSACTIONS.length === 0 ? (
                        <li className="widget-list-empty">No transactions yet</li>
                    ) : (
                        MOCK_TRANSACTIONS.map((t) => (
                            <li key={t} className="widget-list-item">{t}</li>
                        ))
                    )}
                </ul>
                <button className="widget-add-btn" type="button">+ Add transaction</button>
            </div>
        </div>
    )
}