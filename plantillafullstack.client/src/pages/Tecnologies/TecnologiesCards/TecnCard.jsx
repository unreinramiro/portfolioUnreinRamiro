import styles from './TecnCard.module.css'

const TecnCard = ({tecs}) => {
    
  return (
    <div className={`container ${styles.containerTecnCard}`}>
        <div className='row'>
            <h3>{tecs.title}</h3>
        </div>
        <div className='row'>
            <div className={`col-12 ${styles.subContainerTecnCard}`}>
            {tecs.tecnology.map((tec, index) => (
                <p>{tec}</p>
            ))}
            </div>
        </div>
    </div>
  )
}

export default TecnCard