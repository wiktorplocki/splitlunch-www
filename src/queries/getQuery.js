const getQueryFromGQLFile = importedQuery => {
  return importedQuery.loc.source.body;
};

export default getQueryFromGQLFile;
