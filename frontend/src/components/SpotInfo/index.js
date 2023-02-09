export default function SpotInfo({ spot }) {
  return (
    <div className="spot-info">
      <div>
        <div>
          <h2>Spot hosted by {spot.Owner.firstName}</h2>
          <hr></hr>
          <div>
            <img
              className="air-cover"
              src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg"
              alt="aircover"
            ></img>
            <p className="spot-details-overflow">
              Every booking includes free protection from Host cancellations,
              listing inaccuracies, and other issues like trouble checking
              in.
            </p>
          </div>
          <hr></hr>
          <p className="spot-details-overflow">{spot.description}</p>
          <hr></hr>
        </div>
      </div>
    </div>
  );
}
