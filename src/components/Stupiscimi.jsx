import test from '../assets/sfondo.webp'

const Stupiscimi = () => {

    const backGroundStyle = {
        backgroundImage: `url(${test})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        margin: 0
    };

    return(
        <div style={backGroundStyle}>
        <h1>Qui andrà un modulo da compilare per "i gusti" personali</h1>
        </div>
    );
}

export default Stupiscimi