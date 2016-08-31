# SALT 26 admin

This page documents the administration of SALT 26.
The main SALT 26 website is available at [salt.ling.utexas.edu/26](http://salt.ling.utexas.edu/26/).


## Abstract submission and review process

### Topics

We provided the option of selecting multiple topics out of the following list:

* Acquisition of meaning
* Anaphora and ellipsis
* Attitudes & intentionality
* Comparatives and superlatives
* Compositionality
* Computational semantics
* Conditionals
* Conjunction and/or disjunction
* Corpus-based semantics
* Definiteness, indefiniteness and specificity
* Diachronic semantics
* Dialogue semantics
* Discourse structure
* Dynamic Semantics & DRT
* Evidentiality
* Exclusives and additives
* Exhaustivity and maximality
* Existential constructions
* Experimental semantics and pragmatics
* Field-based semantics and semantics of underrepresented languages
* Genericity and kinds
* History of semantics and pragmatics
* Imperatives
* Implicature
* Indexicality and deixis
* Information Structure
* Lexical Semantics, thematic structure
* Mereology
* Modality
* Modifiers (adjectives, adverbs)
* Plurality and distributivity
* Polarity / Negation
* Possessives
* Quantification and scope
* Questions and interrogatives
* Quotation
* Scalarity, degree semantics
* Semantics of signed language
* Semantic processing
* Social meaning
* Speech acts and performativity
* Temporality (Tense, aspect)
* Typology and variation
* Vagueness and gradability

"Semantics of signed language" was added on 2015-12-01.

We considered "Neurolinguistic semantics" as a topic, but decided it wasn't enough of a thing except in the non-linguistic context of neuro-linguistic programming.


### Special session topics

For the special session on presupposition, we offered the following topics in a subsequent section:

* Anaphoric presupposition
* Corpus approaches to presupposition
* Cross-linguistic approaches to presupposition
* Definiteness presuppositions
* Diagnostics for presupposition
* Experimental approaches to presupposition
* Factive presuppositions
* Logics of presupposition
* Pragmatic presupposition
* Presupposition & conventional implicature
* Presupposition & focus
* Presupposition & quantification
* Presupposition accommodation
* Presupposition projection
* Presuppositional scales (Maximize presupposition)
* Variation between presupposition triggers (e.g. hard vs. soft)


## Emails

Templates for the various emails we delivered to authors and reviewers are available in the [email](email/) folder.

- **2015-11-24** [reviewer-invitation.txt](email/reviewer-invitation.txt): The "SALT 26 - Invitation to review" personal email was sent out to our mailing list of semantics contacts.
- **2015-12-20** [topics-needed.txt](email/topics-needed.txt): The "SALT 26 - reviewing assignments - topics needed!" EasyChair notification was sent out to reviewers who had not self-assigned any topics on EasyChair.
- **2015-12-23** [assignments.txt](email/assignments.txt): The "SALT 26 paper assignment" EasyChair notification was sent out to all reviewers.
- **2016-01-13** [author-response-reminder.txt](email/author-response-reminder.txt): The "Upcoming author response period (January 23-29)" EasyChair notification was sent out to 241 authors (those that were marked as the "corresponding" authors) of 182 papers.
- **2016-01-15** [reviewing-reminder.txt](email/reviewing-reminder.txt): The "SALT reviewing reminder (due January 22!)" EasyChair notification was sent out to all reviewers.
- **2016-01-19** [reviewer-trouble.txt](email/reviewer-trouble.txt): The "SALT 26 - Reviewing (are you OK?)" personal email was sent out to a dozen reviewers who had never logged into EasyChair (at least not the SALT site).
- **2016-01-19** [review-reminder-2.txt](email/review-reminder-2.txt): The "SALT 26 review reminder" EasyChair notification was sent out to all reviewers who had logged in to EasyChair but not submitted any of their assigned reviews.
- **2016-01-23** [review-reminder-3.txt](email/review-reminder-3.txt): The "SALT 26 (final!?) review reminder" EasyChair notification was sent out to a couple dozen reviewers who had logged in to EasyChair in the last month or so, but had not submitted any of their assigned reviews.
- **2016-01-23** [author-notification.txt](email/author-notification.txt): The "SALT 26 review feedback available for submission #" EasyChair notification was sent out to 241 authors of 182 submissions.
- **2016-01-27** [author-notification-2.txt](email/author-notification-2.txt): The "SALT 26 author response period reminder; additional reviews in some cases" EasyChair notification was sent out to all authors.
- **2016-01-30** [reviewer-response.txt](email/reviewer-response.txt): The "SALT 26 author response ends; reviewer response begins" EasyChair notification was sent out to 276 reviewers (those that had previously submitted reviews).
- **2016-03-11** [program-announcement.txt](email/program-announcement.txt): The "SALT 26 Program Announcement" email was sent out to 632 addresses on the semantics mailing list (which now includes all of the EasyChair authors, "corresponding" or not).
- **2016-03-14** [accepted-abstract-request.txt](email/accepted-abstract-request.txt): The "SALT 26 Publicity" email was sent out to the 88 corresponding authors of 61 papers.
- **2016-05-31** [author-packet.txt](email/author-packet.txt): The "SALT 26 Author Instruction Packet" went out to the 92 authors eligible for publication in the proceedings.
- **2016-07-05** [survey.txt](email/survey.txt): The "SALT 26 Survey" email was sent to 297 corresponding abstract authors and registered participants.
- **2016-07-26** [reviewing-thanks.txt](email/reviewing-thanks.txt): The "Thank you from SALT at UT Austin!!!" email was sent out to 277 active reviewers (including authors and registered participants, so there was some overlap with the previous survey email), and included the survey link.


## EasyChair

### Evaluations of open source conference software

This [List of Open Source Conference Management Systems](https://feeding.cloud.geek.nz/posts/list-of-open-source-conference/) blog post from 2010 lists some of the software out there, and the comments point to additional options.

I spent a few hours trying out some of those options, along with a few others I came across on GitHub. It's pretty bleak.

* Act: Perl, ancient, couldn't even get the install script to run, documentation is non-existent
* ConMan: Python (Django), couldn't figure out which version of Django it required (I tried three and then gave up)
* zookeepr: Python (Django), starts okay, seems to have a lot of features, but also a lot of relics from the event they implemented it for (some Australian Linux conference in 2011)
* SlickChair: Scala, runs without too much effort, but I have no clue how to add an admin user and there's no documentation
* HotCRP: PHP, runs without too much trouble, has support for topics. Seems promising, but uploading a PDF failed, since it tried to stick in the database, but apparently didn't like the default collation / recent version of MySQL. I didn't waste any time debugging.
* OCS (from the OJS people): PHP, runs pretty easily, but it feels like OJS, just with "journal" replaced with "conference" -- there's a keywords field, but I don't see where to add topics.
* Pentabarf: Ruby on Rails, tedious manual install process, I gave up.
* Summit: Python (Django), got it all installed, I think, only to get some THEME_MEDIA error when I open up the main page
* OpenConferenceWare: Ruby on Rails, it starts up and runs okay, but doesn't have nearly enough flexibility
* Scalereg: Python (Django), ran into database initialization issues in the second setup step.

Interesting exercise, though depressing (makes you really question the value/contribution of throwing together some random project and then open-sourcing it).

For our purposes, OCS seemed like the only feasible one out of all of these, and it still left a lot to be desired.

One upside of going through this ordeal was that EasyChair became much more palatable, by comparison with the alternatives.

Another proprietary / commercial option is [START V2 ConferenceManager](http://softconf.com/), which we didn't evaluate, but also seems to be widely used. The word on Twitter, though, is that START makes EasyChair look good.


### Some notes (a list of grievances)

**tl;dr**: EasyChair is not the worst, but it's a pity that it's the best.

EasyChair is surprisingly common.
I subscribe to a mailing list called "Corpora-List" (hosted by uib.no), and searching my email for "easychair" in that folder shows an EasyChair URL approximately every 2 days — and that's just one large-ish field.
On their website, EasyChair claims reaching [1 million users](http://easychair.org/news_item.cgi?id=20962278) as of 2014-01-06.

After using EasyChair for a conference from beginning to end, for nearly every purpose but submitting a paper, my overall impression is that:

- as a web app, it's one of the worst I've ever (extensively) used.
- as conference management software, it is, unfortunately, one of the best.

From what I hear, the free version used to have more features, and it's hard to complain much about something that's free.
But we needed a couple of trivial features that were [not available in the free version](http://easychair.org/licenses.cgi), including:

* Two additional submission fields: a checkbox for "submit for special session" and a checkbox for "submit as poster candidate"
* Data export functionality. We didn't originally anticipate needing this, but it proved invaluable due to limitations of the EasyChair interface.

So we paid 265 GBP (≈ $409 USD) for the "professional" license. It is capable, but frustrating. Here are some pain points:

* The user interface flouts all sorts of standard practices that good web apps adhere to:
  - For all but the basic root pages, URLs are not persistent. To share a page on the app with another user, you have to describe how to navigate to that page after logging in. You can't simply send them the URL.
  - Compounding the URL headache, many of the links in the app have JavaScripted event overrides, so basic navigational tools like command-clicking a link to open a new tab doesn't work.
  - The web app has a fragmented design, so even if you get comfortable working with the tables on the program committee page, for example, things will be somewhat different on the authors / submissions tables.
  - What links go where is often a matter of random clicking and memorization. In some places you can click on a submission title, in others, you have to click on the magnifying glass on the submissions row. Inconsistencies like this can be found throughout the app.
* There's barely any documentation. Some pages have short descriptions, some have mouseover popups to describe certain interface items, but a good portion of the user interface is perplexing, and the only way to figure out what something does is to do it and hope for the best (or hope that you can undo it, if needed). Some of the most useful help pages I found while Googling were from other people who had the same problem and had cobbled together some kind of hack of a solution.
* I spent something like 10 hours trying to walk a number of reviewers through the process of recovering / differentiating / merging their multiple EasyChair accounts that were associated with different emails. This is possible, and not too tricky once you have a decent grasp of how EasyChair handles user accounts from the admin side (and which email is currently associated which role), but it is extremely user unfriendly and wastes a lot of time.
* EasyChair tells you when a user (identified by email address) last logged into EasyChair (if at all), regardless of whether or not they agreed to review for you. While this is nice for keeping tabs on whether your reviewers have even looked at their reviews, it strikes me as a privacy leak.
* The data export is badly organized. The sheets in the Excel export roughly map to SQL tables, but there are, for example, multiple representations of users and user IDs across authors and reviewers, which in our case had quite a bit of overlap. They also represent boolean values, like 'corresponding' on the authors table, as checkmarks. I ended up writing a Node.js package to read Excel files into a PostgreSQL database more or less automatically (mapping sheets to tables), and then some EasyChair-specific SQL views to sanitize/normalize the raw data.
* The data export omits some of the data available on the EasyChair site, such as the responses from the author-response process. Because there is no mechanism for submitting bug reports, or even a single developer email address / support mailing list, I emailed the billing@easychair.org address requesting this data, to no avail (support@easychair.org simply kicks back a undeliverable error).
* Technical support only kicks in at the "Executive" license level (525 GBP ≈ $788 USD), which is about twice the price of the "Professional" level (265 GBP ≈ $409 USD). Beyond a few intermittent errors (which typically succeeded after a few retries) and missing data, as described above, I didn't personally encounter any bugs. But the business model put us in a bind — either we accept any shortcomings and inscrutabilities of the product as-is (there were a couple; one of the reviewers emailed that he was unable to log on to EasyChair despite his best efforts to reset his password, clear cookies, etc.), or we pony up the difference to the next license level and hope for the best. We didn't upgrade to the full support level.
* EasyChair seems to be making a name for itself (a name that doesn't start with "easy"); here's a snippet from one of the reviewers who declined:

  > I hesitated to reply because in principle I would be inclined to do it, but there are technical difficulties with EasyChair. It's a long story, somehow my role as an author and as a reviewer got in conflict, and any attempt to create a new account ends up with the message that I am already registered. In the past, I got the evaluation sheets from the organizers who then uploaded them to EasyChair, but that's perhaps too cumbersome.
  >
  > So my decision is unfortunately: no, sorry, I don't want to get into that mess again.

I've heard of other people having much less dismal experiences with EasyChair in the past.
I'm guessing all the annoyances are easier to stomach if it's free, so it's certainly not as rosy as it might once have been.
Perhaps the new monetization will bring in funds to improve the product as a whole, but I'm not holding my breath.


## Payments

### Considerations when evaluating payment processors

(Extracted from an email thread from mid-February 2016)

The UT-internal service "TX Shop" is what we used for [NASSLLI 2012](http://nasslli2012.com/) and it was a pain to set up and explain on the NASSLLI registration page, but reliable enough once it was up and people were told exactly how to use it. I forget what fee we paid then, but they would charge a flat $700 setup fee for setting up a new "shop" for SALT registrations.

[PayPal](https://www.paypal.com/webapps/mpp/merchant-fees), [Square](https://squareup.com/online-store), and [Stripe](https://stripe.com/us/pricing) are all solid online payment processors that operate at our (small) scale, and all charge 2.9% + $0.30 per sale. PayPal has a slightly lower rate for non-profits (2.2% + $0.30), but it's unclear if that'd apply to us, and Square currently has a promo for online sales (2.75% + $0.30). [TLS](http://tls.ling.utexas.edu/) has been using PayPal since 2012 (four conferences so far), and in my experience, it works great for that.

If we wanted something specialized for event registration, [EventBrite](https://www.eventbrite.com/fees/) charges 5.5% + $0.99.

* Stanford used [Certain](https://www.certain.com/event-management/online-registration/), which I've never heard of before, and which doesn't specify their fees on their public website. I get the impression Stanford has an ongoing deal with them, based on Stanford + Certain search results.
* I can't tell what NYU (SALT 24 in 2014) used.
* UCSC (SALT 23 in 2013) isn't even loading for me right now and the WayBack Machine didn't capture their payment page, but it looks like something internal to UCSC.
* UChicago's (SALT 22 in 2012) registration page has only dead links.
* Rutgers (SALT 21 in 2011) used PayPal.
* Simon Fraser's (SALT 20 in 2010) registration form has been closed, but it looks internal to SFU.

Just as a ballpark estimate, if we charge what Stanford did — $40 / student, $80 / faculty for the early-bird rate — and have 50 students and 50 faculty register, that's $6000. PayPal's (or the others') fees would add up to $204.

Under the same ballpark estimate ($6000 of fees across 100 transactions), EventBrite would cost $429. But I don't think we need any of the additional features of EventBrite, like discount codes or availability periods.

**Results and rationale**

Despite EventBrite's exorbitant fees (more than twice those of other processors), we ended up going with them because they have an option to mail you a physical check a week or two after the end of the payment period, which is convenient.

* We did use their cut-off date functionality for early-bird registrations, but that could easily have been done, e.g. on PayPal, by logging on and changing the names and prices of the two products (student vs. faculty) on that date.
* We didn't use any of their other event-oriented functionality, like discount codes or ticket scanning on-site.
* We did process a number of refunds and changed some of the ordering data manually, which was easy, but again, I expect those basic tasks on other platforms are similarly easy.

Finally, my EventBrite fees estimate ended up only $18 off what we actually paid in fees.


## Survey

The survey was based on NYU's 2014 survey, and administered via [Qualtrics](https://utexas.qualtrics.com/).
The exported schema (not data) of the final version, in Qualtrics format, is available at [`survey.qsf`](survey.qsf).

There are four blocks/pages:

1. Demographics, shown to everyone, asking for conference participation level, academic status, and gender
2. Conference details, shown if the participation level was "Conference attendee"
3. Review process, shown if the participation level was "Abstract author" or "Author reviewer"
4. Final page, shown to everyone, asking about the special session


## Misc. Comments / Advice

* Even if all the relevant information is online, or in an email, people love printouts. Here's some of the stuff we printed and made available at the registration desk:
  - Wi-fi access information
  - Public URL to shared Box.com folder
  - Campus map with relevant buildings & nearby parking highlighted
  - Full program on single page, 2-up and double-sided (it was handy to have a print-friendly program on the website for this purpose)
* Deadlines:
  - Even if there is no hard deadline, practically, make one up. People love deadlines.
  - If you want to receive an email by the time X rolls around, choose your wording carefully. "Email it to us before X" seems to confuse some people. "Email it to us by (X-1)" or "Email it to us. Deadline: (X-1)" works better.
  - Depending on the purpose, a lot of people will be late. Box.com's "Email to upload" feature is really handy, so that you don't have to worry about transferring last-minute email attachments to the presentation console.
  - Box.com can be configured to send confirmations for each emailed file. People love confirmations that they did something.
  - If you do ask for submissions to be emailed, you might periodically remind people that saving an email to their 'Drafts' folder does not count as sending it to you. Manually replying to every incoming email to confirm is infeasible, and anyway, email is one of the most reliable forms of communication (apart from user error).
  - If you can figure out a way to say "even if you miss the deadline, send it along anyway and we can probably still make it work" without softening the sense of deadline, that might allay some time-consuming questions. For example, it's much easier to handle a late submission than to reply to an email saying "I'm sorry! I realize I'm late but can I still submit?" (_sans_ attachment) and subsequently handle an even later submission.
* Despite having recently entered the 21st century, A/V is still finicky.
  - Have a dedicated laptop for presentation purposes
    + Have it plugged in, so that it can just sit there all day
    + On-the-fly fixes: the snappier the better. If you're getting a loaner laptop, get something that's new and fast. It's not a single point of failure, since laptops are a commodity, but mending the failure takes (wastes) time.
    + This also helps ensure there are no time-wasting scrambles to find the appropriate video adapter or power sources
    + Strongly suggest that all presenters submit their slides beforehand. See above about deadlines and Box.com.
  - Sync a Dropbox / Box.com folder on that machine. The cloud / web is a far more trustworthy and fluid information transmission device than any presentation setup (as long as you have wi-fi).
* Lightning talks:
  - Don't allow people to zoom/pan on their slides. This confuses Preview.app / Acrobat Reader, and disrupts subsequent presenters (though, of the two, Reader makes it marginally easier to recover from this). This can be part of the instructions, or by only giving the lightning talk presenters a slide clicker, rather than access to the presentation device desktop.
* Organization:
  - Figure out what people plan to do during their session, so that you know to pester them to submit their slides if they want to show slides.
  - Even if you make it crystal clear how submitted files should be named, lots of people will find it difficult to follow these kinds of directions. I'm beginning to think there should be a sort of administrative checklist, where people can check whether they have satisfied some requirement, and would be responsible for ensuring that it's checked before some deadline.
    + Part of that admin back-end could be automated, where somebody's "talk is uploaded correctly" box doesn't get checked until there's a file with the proper name in the proper folder.
    + For something that can't be automated, e.g., someone's "has been awarded scholarship" box, that would be configurable manually by one of the administrators.
