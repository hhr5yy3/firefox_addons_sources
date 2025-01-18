# README-Firefox
# Restarted for the new SCOWL lists as of Version 3.0.1
#
# This file documents the changes that were applied to the en-CA.dic file by 
# Paul Schmiedge.  Many of the changes were suggested by users of the Firefox 
# extension, but I have done my best to follow up every suggestion with 
# research into a source to confirm the words' status in Canadian English.  
# Research sources included the Hansard Style Guide and Canadian Oxford 
# Dictionary.
#
# Description of my file format:
# ADD - the text was added to the .dic file
# CNG - the first text was removed, and replaced with the second
# DEL - the text was removed from the .dic file
# REP - the replacement rule was added to the .aff file

# Common words
ADD amongst
ADD apnea
ADD as
ADD Canuck/MS
ADD eavestrough/MS
ADD enquire/G
ADD enquiry/S
ADD fulfil
ADD humidex
ADD is
ADD masculinist/S
ADD masculinize
ADD masculist/SM
ADD misandrist/SM
ADD misandry/M
ADD nauseam # Part of "ad nauseam"
ADD okay/SDJ
ADD parkade/SM
ADD poutine/SM
ADD pretence/SXMN
ADD programme/S
ADD scalable
ADD toonie/MS
ADD touchpad/MS
ADD touque/MS
ADD x-ray/S
ADD X-ray/S
CNG forecast/MRZGS forecast/MRZGSD
CNG soak/MDGSJ soak/MDGSJR
CNG thing/M thing/SM
ADD diatomaceous

# Merge from en-US per https://bugzilla.mozilla.org/show_bug.cgi?id=926731
ADD autocomplete/S
ADD decrypt
ADD interruptible
ADD profile/RSZG
ADD programmatically
CNG discover/ASDG discover/ASDGB
CNG native/MS native/MSY
CNG size/AGDS size/MGBDRSA

# City names
ADD Abbotsford/M
ADD Chilliwack/M
ADD Nanaimo/M
ADD Osoyoos/M
ADD Rideau/M

# Technical words
ADD http
ADD SMS

# Affix file changes
REP teh the