export default function PartnerList({ partners, onEdit }) {
    return (
        <div className="card">
            <div className="card-header">Partners</div>
            <ul className="list-group list-group-flush">
                {partners.map((partner) => (
                    <li 
                        key={partner.id} 
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        {partner.name}
                        <button 
                            className="btn btn-primary btn-sm" 
                            style={{
                                backgroundColor: '#fd6909',
                                borderColor: '#fd6909',
                                color: '#fff',
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ff7e30'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fd6909'}
                        
                            onClick={() => onEdit(partner)} // Trigger the edit function
                        >
                            Edit
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
