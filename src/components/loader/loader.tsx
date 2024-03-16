import { Helmet } from 'react-helmet-async';

function Loader(): JSX.Element {
  return (
    <div className="lds-roller">
      <Helmet>
        <link rel="stylesheet" href="css/loader.css" />
      </Helmet>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loader;
