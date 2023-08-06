export const Header = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        maxWidth: '100vw',
        width: '100%',
        textAlign: 'center',
        padding: '0 20px',
        boxSizing: 'border-box',
      }}
    >
      <h1
        style={{
          color: 'white',
          fontSize: '30px',
          letterSpacing: '20px',
          fontWeight: 'lighter',
          paddingBottom: '5px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        SUNFLOW
      </h1>
    </div>
  )
}
