import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";

import "./Bookings.css";

import format from "date-fns/format";
import { addDays } from "date-fns";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function Calendar({ range, setRange }) {
  // open close
  const [open, setOpen] = useState(false);

  // get the target element to toggle
  const refOne = useRef(null);

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Hide on outside click
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <div className="calendarWrap">
      <div className="calendar_date_selection">
        <input
          // value={`CHECK-IN ${format(range[0].startDate, "MM/dd/yyyy")}`}
          value={
            range[0].startDate
              ? `CHECK-IN ${format(range[0].startDate, "MM/dd/yyyy")}`
              : "Add Date"
          }
          readOnly
          className="inputBox"
          onClick={() => setOpen((open) => !open)}
        />
        <input
          value={
            range[0].startDate
              ? `CHECKOUT ${format(range[0].endDate, "MM/dd/yyyy")}`
              : "Add Date"
          }
          readOnly
          className="inputBox"
          onClick={() => setOpen((open) => !open)}
        />
      </div>

      <div ref={refOne}>
        {open && (
          <DateRange
            onChange={(item) => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={
              range[0].endDate
                ? range
                : [
                    {
                      startDate: new Date(),
                      endDate: addDays((new Date()), 1),
                      key: "selection",
                    },
                  ]
            }
            months={1}
            direction="horizontal"
            className="calendarElement"
            rangeColors={["#f33e5b", "#3ecf8e", "#fed14c"]}
          />
        )}
      </div>
    </div>
  );
}
