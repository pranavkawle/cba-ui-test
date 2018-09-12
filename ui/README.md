# Assumptions

- Apply for carryover amount functionality would be similar to apply new, hence not implemented.
- Applying for new loan screen has only inputs which are needed to show information on list page. No other calculation performed on the values.
- API base Url: http://localhost:56029/api/


# Features

- Tried to showcase multiple ways for inter-component interaction including
  * Service
  * Input decorator
  * Output decorator
- Used nested components to imitate real life scenario
- Used routing instead of hiding/showing different components
- Used error service to emit errors, which can be handled at single location (usually at parent level)