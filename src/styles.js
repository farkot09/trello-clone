// styles.js
const globalStyles = {
    paperNewTask: {
      padding: "16px",
      borderRadius: "8px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
      maxWidth: "300px", 
      margin: "auto",
      marginBottom:"10px",
      transition: 'transform 0.3s ease-in-out', // Suaviza el escalado
      '&:hover': {
        transform: 'scale(1.1)', // Escala el componente al 110%
      },
    },
    titleNewTask: {
      whiteSpace: "normal",    
      wordWrap: "break-word",  
    },
    buttonNewTask:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",  
        borderRadius: '10px', // Bordes redondeados para un diseño más suave
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        maxWidth: "300px",        
        margin: "auto", 
        marginBottom:"10px"
    },
    headerNewTask: {      
        height: "4px",
        width: "50px",
        backgroundColor: "#e158a0",
        borderRadius: "2px",
        marginBottom: "12px",      
    },
    headerInProgress: {      
      height: "4px",
      width: "50px",
      backgroundColor: "#92d4f0",
      borderRadius: "2px",
      marginBottom: "12px",      
  },
  headerDone: {      
    height: "4px",
    width: "50px",
    backgroundColor: "#42b9a8",
    borderRadius: "2px",
    marginBottom: "12px",      
},
boxListask:{
  border: '2px solid #e158a0', // Borde continuo de color azul
  padding: '16px',
  borderRadius: '10px', // Bordes redondeados para un diseño más suave
  backgroundColor: '#f1f1f1', // Color de fondo gris claro  
  justifyContent: 'center',
  alignItems: 'center',

}

  };
  
  
  export default globalStyles;
  