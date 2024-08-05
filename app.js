class Utilisateurs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prenom: '',
            nom: '',
            email: '',
            telephone: '',
            utilisateurs: JSON.parse(localStorage.getItem('utilisateurs')) || [],
            modif: null
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { prenom, nom, email, telephone, utilisateurs, modif } = this.state;

        if (modif !== null) {
            utilisateurs[modif] = { prenom, nom, email, telephone };
        } else {
            utilisateurs.push({ prenom, nom, email, telephone });
        }

        this.setState({
            utilisateurs,
            prenom: '',
            nom: '',
            email: '',
            telephone: '',
            modif: null
        });

        localStorage.setItem('utilisateurs', JSON.stringify(utilisateurs));
    }

    handleEdit = (index) => {
        const { prenom, nom, email, telephone } = this.state.utilisateurs[index];
        this.setState({
            prenom,
            nom,
            email,
            telephone,
            modif: index
        });
    }

    handleDelete = (index) => {
        const utilisateurs = [...this.state.utilisateurs];
        utilisateurs.splice(index, 1);
        this.setState({ utilisateurs });
        localStorage.setItem('utilisateurs', JSON.stringify(utilisateurs));
    }

    render() {
        return (
            <div className="container">
                <h1 className="text-center mt-5">Gestion des Utilisateurs</h1>
                <div className="shadow p-4 mb-5 bg-body rounded border" style={{ maxWidth: '600px', margin: 'auto' }}>
                    <h2 className="text-center mb-4">{this.state.modif !== null ? 'Modifier Utilisateur' : 'Ajouter Utilisateur'}</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="prenom" className="form-label">Prénom</label>
                            <input type="text" className="form-control border-primary" id="prenom" value={this.state.prenom} onChange={this.handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nom" className="form-label">Nom</label>
                            <input type="text" className="form-control border-primary" id="nom" value={this.state.nom} onChange={this.handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control border-primary" id="email" value={this.state.email} onChange={this.handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="telephone" className="form-label">Téléphone</label>
                            <input type="tel" className="form-control border-primary" id="telephone" value={this.state.telephone} onChange={this.handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            {this.state.modif !== null ? 'Modifier' : 'Ajouter'}
                        </button>
                    </form>
                </div>

                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>Prénom</th>
                                <th>Nom</th>
                                <th>Email</th>
                                <th>Téléphone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.utilisateurs.map((utilisateur, index) => (
                                <tr key={index}>
                                    <td>{utilisateur.prenom}</td>
                                    <td>{utilisateur.nom}</td>
                                    <td>{utilisateur.email}</td>
                                    <td>{utilisateur.telephone}</td>
                                    <td>
                                        <button className="btn btn-outline-info me-2 btn-sm" onClick={() => this.handleEdit(index)}>Modifier</button>
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => this.handleDelete(index)}>Supprimer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Utilisateurs />, document.getElementById('root'));
