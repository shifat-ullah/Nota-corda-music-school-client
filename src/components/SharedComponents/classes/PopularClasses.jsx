import Container from "../NavBar/Container";
import InfoText from "../NavBar/InfoText";

const PopularClasses = () => {
    return (
        <div>
            <Container>
                <InfoText title={'our popular classes'} />
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
                    
                </div>
            </Container>
        </div>
    );
};

export default PopularClasses;