'use client';
type metaData = {
  metaData: string;
};

const MetaDataDashboard = (props: metaData) => {
  return <div>metaDataComponent -- {props.metaData}</div>;
};

export default MetaDataDashboard;
