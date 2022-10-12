import CustomLink from '../CustomLink'

export default function Header() {
    return (
        <header>
            <div className="container">
                <nav>
                    <ul className="menuItems">
                        <li><CustomLink href="/">Home</CustomLink></li>
                        <li><CustomLink href="/transactions" prefetch>Transactions</CustomLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
