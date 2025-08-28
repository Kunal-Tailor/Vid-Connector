import React from 'react'
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'
export default function LandingPage() {

    const router = useNavigate();

    return (
        <div className='landingPageContainer'>
            <nav>
                <div className='navHeader'>
                    <div className='brand-badge'>
                        <img src="/logo192.png" alt="logo" style={{ width: 24, height: 24, borderRadius: 6 }} />
                        <h2>Kunal's Video Call</h2>
                    </div>
                </div>
                <div className='navlist'>
                    <p onClick={() => {
                        router("/aljk23")
                    }} className='btn btn-primary'>Join as Guest</p>
                    <p onClick={() => {
                        router("/auth")

                    }} className='btn btn-primary'>Register</p>
                    <div onClick={() => {
                        router("/auth")

                    }} role='button' className='btn btn-primary'>
                        <p>Login</p>
                    </div>
                </div>
            </nav>


            <div className="landingMainContainer container">
                <div>
                    <h1 className='hero-title'><span style={{ color: "var(--color-accent)" }}>Connect</span> with your loved ones</h1>

                    <p className='hero-subtitle'>Crystal‑clear calls, instant sharing, secure meetings.</p>
                    <div role='button' className='cta'>
                        <Link className='btn btn-primary' to={"/auth"}>Get Started</Link>
                    </div>
                </div>
                <div>

                    <img src="/mobile.png" alt="Preview" />

                </div>
            </div>



        </div>
    )
}