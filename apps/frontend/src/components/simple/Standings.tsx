const Standings = ({ data }) => {
  return (
    <div className="rounded shadow border-b border-gray-200 mb-20 md:overflow-hidden overflow-auto">
      <table className="text-center w-full ">
        <thead className="bg-gray-200 text-gray-700 h-12 text-sm md:text-base">
          <tr>
            <th>
              <div className="md:w-auto w-64">Drużyna</div>
            </th>
            <th>
              <div className="md:w-auto w-20">Mecze</div>
            </th>
            <th>
              <div className="md:w-auto w-20">Bilans</div>
            </th>
            <th>
              <div className="md:w-auto w-20">Dom</div>
            </th>
            <th>
              <div className="md:w-auto w-20">Wyjazd</div>
            </th>
            <th>
              <div className="md:w-auto w-20">Punkty</div>
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {data.map((item, key) => {
            return (
              <tr key={key} className={`border h-16 ${item.nazwa.toLowerCase().includes('żubry') && 'font-bold'}`}>
                <td>
                  <div className="flex flex-row items-center md:w-auto w-64">
                    <div className="flex flex-col w-1/12 font-semibold">{item.pozycja}.</div>
                    <div className="w-12 h-12 hidden md:block relative">
                      {item.logo && (
                        <div className="flex justify-center">
                          <img alt={item.nazwa} src={item.logo} />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col w-10/12 h-full md:items-start md:ml-3 text-center">{item.nazwa}</div>
                  </div>
                </td>
                <td className="border">
                  <div className=" md:w-auto w-20">{item.mecze}</div>
                </td>
                <td className="border">
                  <div className=" md:w-auto w-20">
                    {item.zw} - {item.por}
                  </div>
                </td>
                <td className="border">
                  <div className=" md:w-auto w-20">
                    {item.wdom} - {item.pdom}
                  </div>
                </td>
                <td className="border">
                  <div className=" md:w-auto w-20">
                    {item.wwyjazd} - {item.pwyjazd}
                  </div>
                </td>
                <td className="border">
                  <div className=" md:w-auto w-20">{item.pkt}</div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Standings;
