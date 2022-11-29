import { useAtom } from "jotai"
import { favouritesAtom } from "../store"
import { Card, Col, Row } from "react-bootstrap"
import ArtworkCard from "../components/ArtworkCard"

export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
  if (!favouritesList) return null

  if (favouritesList) {
    return (
      <>
        <Row className="gy-4">
          {favouritesList.length > 0 ? (
            <>
              {favouritesList.map((objID) => (
                <Col lg={3} key={objID}>
                  <ArtworkCard objectID={objID} />
                </Col>
              ))}
            </>
          ) : (
            <Card>
              <Card.Body>
                <h4>Nothing Here</h4>Try adding some new artwork to the list.
              </Card.Body>
            </Card>
          )}
        </Row>
      </>
    )
  } else {
    return null
  }
}
