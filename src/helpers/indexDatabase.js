/* eslint-disable camelcase */
export default function indexDatabase(db) {
  const artworkMap = new Map();
  const deptMap = new Map();

  db.forEach(({ id, accession_number, title, tombstone,
    creator_role, creator_description, department_name }) => {
    // Add dept, or if it already exists, increment the number of works we have for that dept
    let deptWorksCount = deptMap.get(department_name);
    if (deptWorksCount === undefined) deptWorksCount = 0;
    deptMap.set(department_name, deptWorksCount + 1);

    // If this work is already in artworkMap, add the additional creator to that
    if (accession_number && artworkMap.has(accession_number)) {
      const prevObj = artworkMap.get(accession_number);
      const newCreator = {
        creatorRole: creator_role,
        creatorDescription: creator_description,
      };
      if (newCreator.creatorRole === 'NULL' || newCreator.creatorDescription === 'NULL') {
        newCreator.creatorRole = null;
        newCreator.creatorDescription = null;
      }
      const newObj = {
        ...prevObj,
        creator: [
          ...prevObj.creator,
          newCreator,
        ],
      };

      artworkMap.set(accession_number, newObj);
    }
    // We haven't added this work to artworkMap yet
    else {
      const newObj = {
        id,
        accession_number,
        title,
        tombstone,
        departmentName: department_name,
        creator: [
          {
            creatorRole: creator_role,
            creatorDescription: creator_description,
          },
        ],
      };
      if (newObj.creatorRole === 'NULL' || newObj.creatorDescription === 'NULL') {
        newObj.creatorRole = null;
        newObj.creatorDescription = null;
      }
      artworkMap.set(accession_number, newObj);
    }
  });

  const sortedDeptMap = new Map([...deptMap.entries()].sort((a, b) => b[1] - a[1]));

  return [artworkMap, sortedDeptMap];
}
